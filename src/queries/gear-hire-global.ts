import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { GearHireGlobal } from '@/payload-types'

export type GearHireGlobalDTO = NoNumber<GearHireGlobal>

export const getGearHireGlobal = unstable_cache(
  async function () {
    const payload = await getPayloadClient()

    const result = await payload.findGlobal({
      slug: 'gear-hire-global',
    })

    return result as GearHireGlobalDTO
  },
  ['getGearHireGlobal'],
  {
    tags: cacheTags.gearHireGlobal.relatedTags,
  },
)
