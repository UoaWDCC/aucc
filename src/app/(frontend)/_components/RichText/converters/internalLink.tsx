import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({
  linkNode,
}: {
  linkNode: SerializedLinkNode
}): string => {
  // First, guard in case there is no doc attached
  const doc = linkNode.fields.doc
  if (!doc) return '/'

  const { relationTo, value } = doc

  // Narrow the union so TS knows when `value` has a slug
  let slug: string

  if (
    typeof value === 'object' &&
    value !== null &&
    'slug' in value &&
    typeof (value as any).slug === 'string'
  ) {
    // here TS now knows `value` is the doc object
    slug = (value as any).slug
  } else {
    // fallback: raw ID or string
    slug = String(value)
  }

  // route based on the collection
  if (relationTo === 'posts') {
    return `/posts/${slug}`
  } else if (relationTo === 'users') {
    return `/users/${slug}`
  } else {
    return `/${slug}`
  }
}
