import { getPayloadClient } from '@/lib/payload'
import type { Event } from '@/payload-types'

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
