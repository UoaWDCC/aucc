import { getPayloadClient } from '@/lib/payload'

/**
 * Get all trip reports
 * @param page - The page number to get
 * @param limit - The number of rivers to get per page
 * @param sort - The field to sort the rivers by
 * @returns The trip reports and pagination information
 */
export async function getTripReports({
  page = 1,
  limit = 10,
  sort = '-createdAt',
}: {
  page?: number
  limit?: number
  sort?: string
} = {}) {
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

/**
 * Get the 3 most recent published trip reports
 * @returns Array of recent trip reports or null on failure
 */
export async function getRecentTripReports() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'trip-reports',
      limit: 3,
      sort: '-createdAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return result.docs
  } catch (error) {
    console.error('Failed to fetch recent trip reports:', error)
    return null
  }
}
