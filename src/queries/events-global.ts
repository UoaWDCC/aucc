import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { EventsGlobal as EventsGlobalType } from '@/payload-types'

export type EventsGlobalDTO = NoNumber<EventsGlobalType>

export const getEventsGlobal = unstable_cache(
  async function () {
    const payload = await getPayloadClient()

    const result = await payload.findGlobal({
      slug: 'events-global',
    })

    return result as EventsGlobalDTO
  },
  ['getEventsGlobal'],
  {
    tags: cacheTags.eventsGlobal.relatedTags,
  },
)
