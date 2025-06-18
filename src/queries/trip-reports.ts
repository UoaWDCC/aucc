import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import type { TripReport } from '@/payload-types'

export type TripReportDTO = NoNumber<TripReport>

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
    status = 'published',
  }: {
    page?: number
    limit?: number
    sort?: string
    status?: 'published' | 'draft'
  } = {}) {
    const payload = await getPayloadClient()

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
      collection: 'trip-reports',
      page,
      limit,
      sort,
      where: {
        status: {
          equals: status,
        },
      },
    })

    return {
      tripReports: docs as TripReportDTO[],
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
  async function (
    slug: string,
    { status = 'published' }: { status?: 'published' | 'draft' } = {},
  ): Promise<TripReportDTO | null> {
    const payload = await getPayloadClient()

    const tripReport = await payload.find({
      collection: 'trip-reports',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: status,
            },
          },
        ],
      },
      limit: 1,
    })

    if (tripReport.docs.length === 0) {
      return null
    }

    return tripReport.docs[0] as TripReportDTO
  },
  ['getTripReportBySlug'],
  {
    tags: cacheTags.tripReports.relatedTags,
  },
)
