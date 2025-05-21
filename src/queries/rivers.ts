import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { River } from '@/payload-types'

/**
 * Get all rivers
 * @param page - The page number to get
 * @param limit - The number of rivers to get per page
 * @param sort - The field to sort the rivers by
 * @returns The rivers and pagination information
 */
export const getRivers = unstable_cache(
  async function ({
    page = 1,
    limit = 10,
    sort = 'grade',
  }: {
    page?: number
    limit?: number
    sort?: string
  } = {}) {
    const payload = await getPayloadClient()

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
      collection: 'rivers',
      page,
      limit,
      sort,
    })

    return {
      rivers: docs,
      hasNextPage,
      nextPage,
      totalDocs,
    }
  },
  ['getRivers'],
  {
    tags: cacheTags.rivers.relatedTags,
  },
)

/**
 * Get a river by its ID
 * @param id - The ID of the river to get
 * @returns The river
 */
export const getRiverBySlug = unstable_cache(
  async function (slug: string): Promise<River | null> {
    const payload = await getPayloadClient()

    const river = await payload.find({
      collection: 'rivers',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (river.docs.length === 0) {
      return null
    }

    return river.docs[0]
  },
  ['getRiverBySlug'],
  {
    tags: cacheTags.rivers.relatedTags,
  },
)
