import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'

// Rebuild at most hourly; new events and reports appear within the hour
export const revalidate = 3600

const STATIC_PATHS = [
  '/',
  '/about',
  '/events',
  '/trip-reports',
  '/rivers',
  '/gallery',
  '/merchandise',
  '/gear-hire',
  '/resources',
  '/swims',
  '/membership',
]

/** Pages search engines should know about. Drafts are never listed. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, env.SERVER_URL).toString()
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: url(path),
  }))

  try {
    const payload = await getPayloadClient()
    const [events, reports, rivers] = await Promise.all([
      payload.find({
        collection: 'events',
        where: { status: { equals: 'published' } },
        select: { updatedAt: true },
        limit: 0,
        pagination: false,
      }),
      payload.find({
        collection: 'trip-reports',
        where: { status: { equals: 'published' } },
        select: { slug: true, updatedAt: true },
        limit: 0,
        pagination: false,
      }),
      payload.find({
        collection: 'rivers',
        select: { slug: true, updatedAt: true },
        limit: 0,
        pagination: false,
      }),
    ])

    for (const event of events.docs) {
      entries.push({
        url: url(`/events/${event.id}`),
        lastModified: event.updatedAt,
      })
    }
    for (const report of reports.docs) {
      if (report.slug) {
        entries.push({
          url: url(`/trip-reports/${report.slug}`),
          lastModified: report.updatedAt,
        })
      }
    }
    for (const river of rivers.docs) {
      if (river.slug) {
        entries.push({
          url: url(`/rivers/${encodeURIComponent(river.slug)}`),
          lastModified: river.updatedAt,
        })
      }
    }
  } catch (error) {
    // Still serve the static pages if the database is unavailable
    console.error('Failed to list pages for the sitemap:', error)
  }

  return entries
}
