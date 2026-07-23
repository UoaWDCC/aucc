import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type {
  EventSpotlight as EventSpotlightType,
  Media,
} from '@/payload-types'

export type EventSpotlightDTO = NoNumber<EventSpotlightType>

export const getEventSpotlight = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const result = await payload.findGlobal({
        slug: 'event-spotlight',
        depth: 1,
      })

      return result as EventSpotlightDTO
    } catch (error) {
      console.error('Error fetching event spotlight data:', error)
      return {
        spotlightImage: null as Media | null,
        eventLabel: null,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      } as unknown as EventSpotlightDTO
    }
  },
  ['getEventSpotlight'],
  {
    tags: cacheTags.eventSpotlight.relatedTags,
  },
)
