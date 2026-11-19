import type { Access } from 'payload'

import { SWIM_PHOTO_PREFIX } from '../_hooks/delete-swim-photo'

/**
 * Media is public, except photos members uploaded with the swim form whose
 * swim an admin hasn't approved.
 *
 * Those must stay private until the committee ticks "Approved to share". This
 * hides them from the public REST/GraphQL API and from Payload's file route
 * (/api/media/file/...), which applies the same rule. The site's own pages
 * read media with the local API, which skips access control, and only render
 * approved swims.
 *
 * Library images an admin attached to a swim (not `swim-` uploads) stay
 * public, so the gallery or another page using them isn't affected.
 *
 * Admins (any signed-in user) can read everything.
 */
export const mediaRead: Access = async ({ req }) => {
  if (req.user) return true

  const { docs } = await req.payload.find({
    collection: 'swims',
    where: {
      and: [
        { approvedToShare: { not_equals: true } },
        { image: { exists: true } },
      ],
    },
    select: { image: true },
    depth: 1,
    pagination: false,
    overrideAccess: true,
    req,
  })

  const pendingIds = docs.flatMap(({ image }) =>
    typeof image === 'object' && image?.filename?.startsWith(SWIM_PHOTO_PREFIX)
      ? [image.id]
      : [],
  )

  return pendingIds.length > 0 ? { id: { not_in: pendingIds } } : true
}
