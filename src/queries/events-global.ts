import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { EventsGlobal as EventsGlobalType, Media } from '@/payload-types'

export type EventsGlobalDTO = NoNumber<EventsGlobalType>

export const getEventsGlobal = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const result = await payload.findGlobal({
        slug: 'events-global',
      })

      return result as EventsGlobalDTO
    } catch (error) {
      console.error('Error fetching events global data:', error)
      // Return a fallback object with required properties
      return {
        headerImage: null as Media | null,
        petrolCosts: {
          root: {
            type: 'root',
            children: [],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
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
      } as unknown as EventsGlobalDTO
    }
  },
  ['getEventsGlobal'],
  {
    tags: cacheTags.eventsGlobal.relatedTags,
  },
)
