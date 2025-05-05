import { getPayloadClient } from '@/lib/payload'
import type { Event } from '@/payload-types'

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
