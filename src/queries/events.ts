import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { Event } from '@/payload-types'

export type EventDTO = NoNumber<Event>

// Get all events
export const getEvents = unstable_cache(
  async function ({
    page = 1,
    limit = 10,
    sort = '-startTime',
    tripsOnly = false,
  }: {
    page?: number
    limit?: number
    sort?: string
    tripsOnly?: boolean
  } = {}) {
    try {
      const payload = await getPayloadClient()

      const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
        collection: 'events',
        page,
        limit,
        sort,
        where: tripsOnly
          ? {
              eventType: {
                equals: 'trip',
              },
            }
          : {},
      })

      return {
        events: docs as EventDTO[],
        hasNextPage,
        nextPage,
        totalDocs,
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      // Return empty results as fallback
      return {
        events: [] as EventDTO[],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 0,
      }
    }
  },
  ['getAllEvents'],
  { tags: cacheTags.events.relatedTags },
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

export const getNextTrip = unstable_cache(
  async function (): Promise<EventDTO | null> {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'events',
        limit: 1,
        sort: 'startTime',
        where: {
          startTime: {
            greater_than: new Date().toISOString(),
          },
          eventType: {
            equals: 'trip',
          },
        },
      })
      return docs.length > 0 ? (docs[0] as EventDTO) : null
    } catch (error) {
      console.error('Failed to fetch next event', error)
      return null
    }
  },
  ['getNextTrip'],
  {
    tags: [...cacheTags.events.relatedTags, cacheTags.rivers.tag],
  },
)
