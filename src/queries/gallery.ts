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
 * - Uses robust two-step lookup:
 *   1) find tag id by name
 *   2) query gallery where tags include that id
 * - Keeps main’s return shape (hasNextPage, nextPage, totalDocs)
 */
export const getGalleryByTag = unstable_cache(
  async function getGalleryByTag(
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
    const q = String(tagName ?? '').trim()

    // 1) find the tag id by name
    const tagRes = await payload.find({
      collection: 'tags',
      where: { name: { equals: q } },
      limit: 1,
    })
    const tagId = tagRes?.docs?.[0]?.id
    if (!tagId) {
      return { gallery: [], hasNextPage: false, nextPage: null, totalDocs: 0 }
    }

    // 2) query gallery by tag id
    const res = await payload.find({
      collection: 'gallery',
      where: { tags: { in: [tagId] } },
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
  // bump the cache key to your v3 to keep your branch behavior stable
  ['getGalleryByTag:v3'],
  { tags: cacheTags.gallery.relatedTags },
)

