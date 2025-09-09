import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { RiversGlobal } from '@/payload-types'

export type RiversGlobalDTO = NoNumber<RiversGlobal>

export const getRiversGlobal = unstable_cache(
  async function () {
    const payload = await getPayloadClient()

    const result = await payload.findGlobal({
      slug: 'rivers-global',
    })

    return result as RiversGlobalDTO
  },
  ['getRiversGlobal'],
  {
    tags: cacheTags.riversGlobal.relatedTags,
  },
)
