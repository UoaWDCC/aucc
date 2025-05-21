import { Suspense } from 'react'

import { getEvents } from '@/queries/events'
import { EventsGrid } from './components/EventsGrid'
import { EventsGridFallback } from './components/EventsGridFallback'

export default async function EventsPage() {
  const { events } = await getEvents()

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
