import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import type { River } from '@/payload-types'

export type RiverDTO = NoNumber<River>

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
      rivers: docs as RiverDTO[],
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
  async function (slug: string): Promise<RiverDTO | null> {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'rivers',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })

    return docs.length ? (docs[0] as River) : null
  },
  ['getRiverBySlug'],
  { tags: cacheTags.rivers.relatedTags },
)
