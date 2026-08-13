import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { MerchGlobal as MerchGlobalType } from '@/payload-types'

export type MerchGlobalDTO = NoNumber<MerchGlobalType>

export const getMerchGlobal = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const result = await payload.findGlobal({
        slug: 'merch-global',
      })

      return result as MerchGlobalDTO
    } catch (error) {
      console.error('Error fetching merch global data:', error)
      return {
        items: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      } as unknown as MerchGlobalDTO
    }
  },
  ['getMerchGlobal'],
  {
    tags: cacheTags.merchGlobal.relatedTags,
  },
)
