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
  } = {}): Promise<{
    gallery: GalleryDTO[]
    hasNextPage: boolean
    nextPage: number | null
    totalDocs: number
  }> {
    const payload = await getPayloadClient()

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
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

    return {
      gallery: docs as GalleryDTO[],
      hasNextPage,
      nextPage: nextPage ?? null,
      totalDocs,
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

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
      collection: 'gallery',
      where: {
        'tags.name': {
          equals: tagName,
        },
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

    return {
      gallery: docs as GalleryDTO[],
      hasNextPage,
      nextPage: nextPage ?? null,
      totalDocs,
    }
  },
  ['getGalleryByTag'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)
