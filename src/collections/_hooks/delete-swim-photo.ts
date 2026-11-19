import type { CollectionAfterDeleteHook } from 'payload'

/** The swim form stores member photos as `swim-<id>.<ext>`. */
export const SWIM_PHOTO_PREFIX = 'swim-'

/**
 * When a swim is deleted (for example, a rejected submission), delete the
 * photo the member uploaded with it, so it doesn't stay online in Media.
 *
 * Only photos uploaded through the swim form are removed, and only when no
 * other swim still uses them. An image an admin attached from the library is
 * left alone, and Media's own delete guard still blocks deleting anything
 * that's in use elsewhere. Failures are logged and never block the swim's
 * deletion.
 */
export const deleteSwimPhoto: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  const imageId = typeof doc?.image === 'object' ? doc.image?.id : doc?.image
  if (typeof imageId !== 'number') return

  try {
    const media = await req.payload.findByID({
      collection: 'media',
      id: imageId,
      depth: 0,
      overrideAccess: true,
      disableErrors: true,
      req,
    })
    if (!media?.filename?.startsWith(SWIM_PHOTO_PREFIX)) return

    const { totalDocs } = await req.payload.count({
      collection: 'swims',
      where: { image: { equals: imageId } },
      overrideAccess: true,
      req,
    })
    if (totalDocs > 0) return

    await req.payload.delete({
      collection: 'media',
      id: imageId,
      overrideAccess: true,
      req,
    })
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: `Could not delete the photo (media ${imageId}) of a deleted swim`,
    })
  }
}
