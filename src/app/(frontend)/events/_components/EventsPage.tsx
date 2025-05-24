import React, { Suspense } from 'react'

import { EventsGrid } from '@/app/(frontend)/events/_components/EventsGrid'
import { EventsGridFallback } from '@/app/(frontend)/events/_components/EventsGridFallback'
import { Event } from '@/payload-types'

interface EventsPageProps {
  events: Event[]
}

export function EventsPage({ events }: EventsPageProps) {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold">Events</h1>
        <h2 className="text-gray-600">All our upcoming events</h2>
      </div>

      <div className="mt-4">
        <Suspense fallback={<EventsGridFallback />}>
          <EventsGrid events={events} />
        </Suspense>
      </div>
    </div>
  )
}
