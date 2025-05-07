import { getPayloadClient } from '@/lib/payload'
import type { Event } from '@/payload-types'

/**
 * Get all published events
 * @param page - The page number
 * @param limit - Events per page
 * @param sort - Sorting field (default: '-startTime')
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
    where: {
      status: { equals: 'published' },
    },
    page,
    limit,
    sort,
  })

  return {
    events: docs,
    hasNextPage,
    nextPage,
    totalDocs,
  }
}

/**
 * Get a single event by slug
 * @param slug - Unique slug for the event
 * @returns The event object or null if not found
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const payload = await getPayloadClient()

  const res = await payload.find({
    collection: 'events',
    where: {
      slug: { equals: slug },
    },
  })

  if (res.docs.length === 0) return null

  return res.docs[0]
}
