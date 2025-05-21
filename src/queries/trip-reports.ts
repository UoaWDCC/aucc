import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { TripReport } from '@/payload-types'

/**
 * Get all trip reports
 * @param page - The page number to get
 * @param limit - The number of rivers to get per page
 * @param sort - The field to sort the rivers by
 * @returns The trip reports and pagination information
 */
export const getTripReports = unstable_cache(
  async function ({
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
  },
  ['getTripReports'],
  {
    tags: cacheTags.tripReports.relatedTags,
  },
)

/**
 * Get a trip report by its slug
 * @param slug - slug of the Trip Report to get
 * @returns The Trip Report
 */
export const getTripReportBySlug = unstable_cache(
  async function (slug: string): Promise<TripReport | null> {
    const payload = await getPayloadClient()

    const tripReport = await payload.find({
      collection: 'trip-reports',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (tripReport.docs.length === 0) {
      return null
    }

    return tripReport.docs[0]
  },
  ['getTripReportBySlug'],
  {
    tags: cacheTags.tripReports.relatedTags,
  },
)
