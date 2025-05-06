import { getPayloadClient } from '@/lib/payload'
import type { River } from '@/payload-types'

/**
 * Get all rivers
 * @param page - The page number to get
 * @param limit - The number of rivers to get per page
 * @param sort - The field to sort the rivers by
 * @returns The rivers and pagination information
 */
export async function getRivers({
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
}

/**
 * Get a river by its ID
 * @param id - The ID of the river to get
 * @returns The river
 */
export async function getRiverBySlug(slug: string): Promise<River | null> {
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
}
