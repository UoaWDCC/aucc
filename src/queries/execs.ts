import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'

/**
 * Get all execs
 * @param page - The page number to get
 * @param limit - The number of execs to get per page
 * @param sort - The field to sort the execs by
 * @returns The execs and pagination information
 */
export const getExecs = unstable_cache(
  async function ({
    page = 1,
    limit = 10,
    sort = 'name',
  }: {
    page?: number
    limit?: number
    sort?: string
  } = {}) {
    const payload = await getPayloadClient()

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
      collection: 'execs',
      page,
      limit,
      sort,
    })

    return {
      execs: docs,
      hasNextPage,
      nextPage,
      totalDocs,
    }
  },
  ['getExecs'],
  {
    tags: cacheTags.execs.relatedTags,
  },
)
