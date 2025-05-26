'use client'

import React, { Suspense } from 'react'

import Map from '@/app/(frontend)/_components/Map/MapWrapper'
import { EventsGrid } from '@/app/(frontend)/events/_components/EventsGrid'
import { EventsGridFallback } from '@/app/(frontend)/events/_components/EventsGridFallback'
import { Event } from '@/payload-types'

interface EventsPageProps {
  events: Event[]
}

export function EventsPage({ events }: EventsPageProps) {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Events</h1>
        <h2 className="text-gray-600">All our upcoming events</h2>
      </div>

      <div className="mt-4">
        <Suspense fallback={<EventsGridFallback />}>
          <EventsGrid events={events} />
        </Suspense>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-lg font-semibold">Event Location Map</h3>
        <Map
          riverStart={[-36.8485, 174.785]}
          riverEnd={[-36.8485, 174.763]}
          zoom={13}
        />
      </div>
    </div>
  )
}
