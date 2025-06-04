import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import type { Event } from '@/payload-types'

export type EventDTO = NoNumber<Event>

// Get all events
export const getEvents = unstable_cache(
  async function ({
    page = 1,
    limit = 10,
    sort = '-startTime',
  }: {
    page?: number
    limit?: number
    sort?: string
  } = {}) {
    const payload = await getPayloadClient()

    const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
      collection: 'events',
      page,
      limit,
      sort,
    })

    return {
      events: docs as EventDTO[],
      hasNextPage,
      nextPage,
      totalDocs,
    }
  },
  ['getAllEvents'],
  {
    tags: cacheTags.events.relatedTags,
  },
)

/**
 * Get a event by its ID
 * @param id - The ID of the event to get
 * @returns The event
 */
export const getEventById = unstable_cache(
  async function (id: string): Promise<EventDTO | null> {
    try {
      const payload = await getPayloadClient()
      const event = await payload.findByID({
        collection: 'events',
        id,
      })
      return event as EventDTO
    } catch (error) {
      console.error('Failed to fetch event by ID:', error)
      return null
    }
  },
  ['getEventById'],
  {
    tags: cacheTags.events.relatedTags,
  },
)
