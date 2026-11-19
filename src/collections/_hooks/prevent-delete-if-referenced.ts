import {
  APIError,
  type CollectionBeforeDeleteHook,
  type CollectionSlug,
  type FlattenedField,
  type GlobalSlug,
} from 'payload'

/**
 * Dot-notation paths of required, single-value relationship and upload fields
 * that point at `slug`, including fields nested in arrays, groups and named
 * tabs.
 *
 * These are the fields that are NOT NULL in Postgres but have
 * `ON DELETE SET NULL` foreign keys, so deleting the referenced document
 * fails with a raw database error.
 */
export function findRequiredReferencePaths(
  fields: FlattenedField[],
  slug: string,
  prefix = '',
): string[] {
  const paths: string[] = []

  for (const field of fields) {
    const path = prefix ? `${prefix}.${field.name}` : field.name

    if (field.type === 'relationship' || field.type === 'upload') {
      if (field.relationTo === slug && field.required && !field.hasMany) {
        paths.push(path)
      }
      continue
    }

    // array, group and named tab fields carry their own flattened sub-fields
    if ('flattenedFields' in field && Array.isArray(field.flattenedFields)) {
      paths.push(
        ...findRequiredReferencePaths(field.flattenedFields, slug, path),
      )
    }
  }

  return paths
}

/** Every value found at `path` in `data`, stepping into arrays on the way. */
export function valuesAtPath(data: unknown, path: string): unknown[] {
  let current: unknown[] = [data]

  for (const segment of path.split('.')) {
    current = current.flatMap((value) => {
      const items = Array.isArray(value) ? value : [value]
      return items
        .filter((item): item is Record<string, unknown> => {
          return typeof item === 'object' && item !== null
        })
        .map((item) => item[segment])
    })
  }

  return current.filter((value) => value !== undefined && value !== null)
}

const refersTo = (value: unknown, id: number | string) => {
  const ref =
    typeof value === 'object' && value !== null && 'id' in value
      ? (value as { id: unknown }).id
      : value
  return String(ref) === String(id)
}

const labelText = (label: unknown, fallback: string) =>
  typeof label === 'string' ? label : fallback

/**
 * Blocks deleting a document that is still used by a required relationship or
 * upload field elsewhere, and tells the editor where it is used. Without this,
 * Payload's default ON DELETE SET NULL hits a NOT NULL column and the admin
 * shows a raw database error.
 */
export const preventDeleteIfReferenced: CollectionBeforeDeleteHook = async ({
  collection,
  id,
  req,
}) => {
  const { payload } = req
  const usedIn: string[] = []

  for (const other of payload.config.collections) {
    const paths = findRequiredReferencePaths(
      other.flattenedFields,
      collection.slug,
    )
    if (paths.length === 0) continue

    const { totalDocs } = await payload.count({
      collection: other.slug as CollectionSlug,
      where: { or: paths.map((path) => ({ [path]: { equals: id } })) },
      overrideAccess: true,
      req,
    })

    if (totalDocs > 0) {
      const name = labelText(
        totalDocs === 1 ? other.labels?.singular : other.labels?.plural,
        other.slug,
      )
      usedIn.push(`${totalDocs} ${name}`)
    }
  }

  for (const global of payload.config.globals) {
    const paths = findRequiredReferencePaths(
      global.flattenedFields,
      collection.slug,
    )
    if (paths.length === 0) continue

    const data = await payload.findGlobal({
      slug: global.slug as GlobalSlug,
      depth: 0,
      overrideAccess: true,
      req,
    })

    const isUsed = paths.some((path) =>
      valuesAtPath(data, path).some((value) => refersTo(value, id)),
    )
    if (isUsed) usedIn.push(labelText(global.label, global.slug))
  }

  if (usedIn.length > 0) {
    const thing = labelText(collection.labels?.singular, collection.slug)
    throw new APIError(
      `This ${thing.toLowerCase()} can't be deleted because it's still used in: ${usedIn.join(', ')}. Change or remove those first.`,
      409,
      undefined,
      true,
    )
  }
}
