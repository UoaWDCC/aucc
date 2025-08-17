import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { TripReportsGlobal } from '@/payload-types'

export type TripReportsGlobalDTO = NoNumber<TripReportsGlobal>

export const getTripReportsGlobal = unstable_cache(
  async function () {
    const payload = await getPayloadClient()

    const result = await payload.findGlobal({
      slug: 'trip-reports-global',
    })

    return result as TripReportsGlobalDTO
  },
  ['getTripReportsGlobal'],
  {
    tags: cacheTags.tripReportsGlobal.relatedTags,
  },
)
