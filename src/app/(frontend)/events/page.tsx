import { Suspense } from 'react'

import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getEventsGlobal } from '@/queries/events-global'
import { EventsPageContent } from './EventsPageContent'
import { EventsPageSkeleton } from './EventsPageSkeleton'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Events',
    description:
      'Upcoming AUCC kayaking trips, pool sessions and social events, and how to join them.',
    path: '/events',
    image: await headerImageOf(getEventsGlobal),
  })
}

export default function Page() {
  return (
    <Suspense fallback={<EventsPageSkeleton />}>
      <EventsPageContent />
    </Suspense>
  )
}
