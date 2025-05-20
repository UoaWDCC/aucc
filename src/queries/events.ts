import { getPayloadClient } from '@/lib/payload'
import type { Event } from '@/payload-types'

/**
 * Get all events with pagination
 * @param page - Page number
 * @param limit - Events per page
 * @param sort - Sort order
 */
export async function getAllEvents({
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
    events: docs as Event[],
    hasNextPage,
    nextPage,
    totalDocs,
  }
}

/**
 * Get an event by its ID
 * @param id - Event ID
 * @returns Event object or null
 */
export async function getEventById(id: string): Promise<Event | null> {
  try {
    const payload = await getPayloadClient()
    const event = await payload.findByID({
      collection: 'events',
      id,
    })
    return event as Event
  } catch (error) {
    console.error('Failed to fetch event by ID:', error)
    return null
  }
}

/**
 * Get the 3 most recent published events
 * @returns Array of recent events or null on failure
 */
export async function getRecentEvents(): Promise<Event[] | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'events',
      limit: 3,
      sort: '-createdAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return result.docs
  } catch (error) {
    console.error('Failed to fetch recent events:', error)
    return null
  }
}
