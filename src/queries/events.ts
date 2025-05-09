import { getPayloadClient } from '@/lib/payload'
import type { Event } from '@/payload-types'

// Get all events
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
 * Get a event by its ID
 * @param id - The ID of the event to get
 * @returns The event
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const payload = await getPayloadClient()
    const event = await payload.find({
      collection: 'events',
      where: { slug: { equals: slug } },
    })
    return event.docs[0] || null
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return null
  }
}

