import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { Gallery } from '@/payload-types'

export type GalleryDTO = NoNumber<Gallery>

/**
 * Get all gallery items
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
  } = {}): Promise<{
    gallery: GalleryDTO[]
    hasNextPage: boolean
    nextPage: number | null
    totalDocs: number
  }> {
    const payload = await getPayloadClient()

    const res = await payload.find({
      collection: 'gallery',
      page,
      limit,
      sort,
      depth: 1,
      select: {
        id: true,
        createdAt: true,
        image: true,
        tags: true,
      },
    })

    const { docs, hasNextPage, nextPage, totalDocs } = res

    return {
      gallery: docs as GalleryDTO[],
      hasNextPage: !!hasNextPage,
      nextPage: nextPage ?? null,
      totalDocs: totalDocs ?? 0,
    }
  },
  ['getGallery'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)

/**
 * Get gallery items by tag name
 */
export const getGalleryByTag = unstable_cache(
  async function (
    tagName: string,
    {
      page = 1,
      limit = 10,
      sort = '-createdAt',
    }: {
      page?: number
      limit?: number
      sort?: string
    } = {},
  ): Promise<{
    gallery: GalleryDTO[]
    hasNextPage: boolean
    nextPage: number | null
    totalDocs: number
  }> {
    const payload = await getPayloadClient()

    const res = await payload.find({
      collection: 'gallery',
      where: {
        'tags.name': { equals: tagName },
      },
      page,
      limit,
      sort,
      depth: 1,
      select: {
        id: true,
        createdAt: true,
        image: true,
        tags: true,
      },
    })

    const { docs, hasNextPage, nextPage, totalDocs } = res

    return {
      gallery: docs as GalleryDTO[],
      hasNextPage: !!hasNextPage,
      nextPage: nextPage ?? null,
      totalDocs: totalDocs ?? 0,
    }
  },
  ['getGalleryByTag'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)
