import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { Gallery } from '@/payload-types'

export type GalleryDTO = NoNumber<Gallery>

/**
 * Get all gallery items
 * @param page - The page number to get
 * @param limit - The number of items to get per page
 * @param sort - The field to sort the items by
 * @returns The gallery items and pagination information
 */
export const getGallery = unstable_cache(
  async function ({
    page = 1,
    limit = 10,
    sort = '-createdAt',
  }: {
    page?: number
    limit?: number
    sort?: string
  } = {}) {
    const payload = await getPayloadClient()

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
      collection: 'gallery',
      page,
      limit,
      sort,
      depth: 1,
    })

    return {
      gallery: docs as GalleryDTO[],
      hasNextPage,
      nextPage,
      totalDocs,
    }
  },
  ['getGallery'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)
