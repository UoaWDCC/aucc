import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { Gallery } from '@/payload-types'

export type GalleryDTO = NoNumber<Gallery>

// Only swallow "schema not ready" errors in CI/build (fresh DB).
function isSchemaMissing(err: unknown) {
  const e = err as any
  const msg = String(e?.message ?? e)
  const code = e?.code
  // Postgres error codes:
  // 42P01: undefined_table, 42703: undefined_column
  return (
    msg.includes('does not exist') ||
    msg.includes('gallery__rels') ||
    code === '42P01' ||
    code === '42703'
  )
}
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

    try {
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
    } catch (err) {
      if (
        (process.env.CI || process.env.NODE_ENV === 'production') &&
        isSchemaMissing(err)
      ) {
        return { gallery: [], hasNextPage: false, nextPage: null, totalDocs: 0 }
      }
      throw err
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

    try {
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
    } catch (err) {
      if (
        (process.env.CI || process.env.NODE_ENV === 'production') &&
        isSchemaMissing(err)
      ) {
        return { gallery: [], hasNextPage: false, nextPage: null, totalDocs: 0 }
      }
      throw err
    }
  },
  ['getGalleryByTag'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)
