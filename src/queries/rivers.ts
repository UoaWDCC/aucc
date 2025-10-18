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
    try {
      const payload = await getPayloadClient()

      const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
        collection: 'rivers',
        page,
        limit,
        sort,
        depth: 2, // hydrate relations so RiverDTO matches
      })

      return {
        rivers: docs as RiverDTO[],
        hasNextPage,
        nextPage,
        totalDocs,
      }
    } catch (error) {
      console.error('Error fetching rivers:', error)
      // Return empty results as fallback
      return {
        rivers: [] as RiverDTO[],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 0,
      }
    }
  },
  ['getRivers'],
  { tags: cacheTags.rivers.relatedTags },
)

/**
 * Get a river by its slug
 * @param slug - The slug of the river to get
 * @returns The river (DTO) or null
 */
export const getRiverBySlug = unstable_cache(
  async function (slug: string): Promise<RiverDTO | null> {
    try {
      const payload = await getPayloadClient()

      const { docs } = await payload.find({
        collection: 'rivers',
        where: { slug: { equals: slug } },
        depth: 2, // ensure featuredImage et al. are objects, not ids
        limit: 1,
      })

      return docs.length ? (docs[0] as RiverDTO) : null
    } catch (error) {
      console.error('Error fetching river by slug:', slug, error)
      return null
    }
  },
  ['getRiverBySlug'],
  { tags: cacheTags.rivers.relatedTags },
)
