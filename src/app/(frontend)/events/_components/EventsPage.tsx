'use client'

import React, { Suspense } from 'react'

import { EventsGrid } from '@/app/(frontend)/events/_components/EventsGrid'
import { EventsGridFallback } from '@/app/(frontend)/events/_components/EventsGridFallback'
import { MapComponent } from '@/components/Map/MapWrapper'
import { Event } from '@/payload-types'
import { UpcomingSection } from './Upcoming/UpcomingEvents'

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

      <UpcomingSection />

      <div className="mt-4">
        <Suspense fallback={<EventsGridFallback />}>
          <EventsGrid events={events} />
        </Suspense>
      </div>
      <div className="mt-8">
        <h3 className="mb-2 text-lg font-semibold">Event Location Map</h3>
        <MapComponent
          coordinates={[
            {
              latitude: -36.8485,
              longitude: 174.7633,
              label: 'Start of River',
            },
            { latitude: -36.86, longitude: 174.775, label: 'End of River' },
            { latitude: -36.868, longitude: 174.769, label: 'Ender of River' },
          ]}
        />
      </div>
    </div>
  )
}
