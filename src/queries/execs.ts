import { getPayloadClient } from '@/lib/payload'

/**
 * Get all execs
 * @param page - The page number to get
 * @param limit - The number of rivers to get per page
 * @param sort - The field to sort the rivers by
 * @returns The trip reports and pagination information
 */
export async function getExecs({
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
}
