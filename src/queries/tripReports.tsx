import { getPayloadClient } from '@/lib/payload'
import type { TripReport } from '@/payload-types'

/**
 * Get all trip reports
 * @param page - The page number to get
 * @param limit - The number of rivers to get per page
 * @param sort - The field to sort the rivers by
 * @returns The trip reports and pagination information
 */
export async function getTripReports(
  page = 1,
  limit = 10,
  sort = '-createdAt',
) {
  const payload = await getPayloadClient()

  const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
    collection: 'trip-reports',
    page,
    limit,
    sort,
  })

  return {
    tripReports: docs,
    hasNextPage,
    nextPage,
    totalDocs,
  }
}
