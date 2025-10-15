import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { TripReportsGlobal } from '@/payload-types'

export type TripReportsGlobalDTO = NoNumber<TripReportsGlobal>

export const getTripReportsGlobal = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const result = await payload.findGlobal({
        slug: 'trip-reports-global',
      })

      return result as TripReportsGlobalDTO
    } catch (error) {
      console.error('Error fetching trip reports global data:', error)
      // Return a fallback object with required properties
      return {
        headerImage: null as any,
        introText: {
          root: {
            type: 'root',
            children: [],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      } as unknown as TripReportsGlobalDTO
    }
  },
  ['getTripReportsGlobal'],
  {
    tags: cacheTags.tripReportsGlobal.relatedTags,
  },
)
