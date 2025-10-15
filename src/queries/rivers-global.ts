import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { RiversGlobal } from '@/payload-types'

export type RiversGlobalDTO = NoNumber<RiversGlobal>

export const getRiversGlobal = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const result = await payload.findGlobal({
        slug: 'rivers-global',
      })

      return result as RiversGlobalDTO
    } catch (error) {
      console.error('Error fetching rivers global data:', error)
      // Return a fallback object with required properties
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
      } as unknown as RiversGlobalDTO
    }
  },
  ['getRiversGlobal'],
  {
    tags: cacheTags.riversGlobal.relatedTags,
  },
)
