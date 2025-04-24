import { getPayloadClient } from '@/lib/payload'
import type { TripReport } from '@/payload-types'

/**
 * Get a trip report by its ID
 * @param id - ID of the Trip Report toget
 * @returns The Trip Report
 */
export async function getTripReportBySlug(
  slug: string,
): Promise<TripReport | null> {
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
}
