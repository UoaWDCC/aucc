'use client'

import React from 'react'

import { EventDTO } from '@/queries/events'
import { EventsHeaderSection } from './header/EventsHeaderSection'
import { UpcomingSection } from './intro/UpcomingEvents'
import { PastTripsSection } from './past-trips/PastTripsSection'
import { UpcomingTripsSection } from './upcoming-trips/UpcomingTripsSection'

interface EventsPageProps {
  events: EventDTO[]
}

export function EventsPage({ events }: EventsPageProps) {
  const now = new Date()
  const upcomingTrips = events.filter(
    (event) => new Date(event.startTime) >= now,
  )

  const pastTrips = events.filter((event) => new Date(event.startTime) < now)

  return (
    <>
      <EventsHeaderSection />
      <UpcomingSection />
      <UpcomingTripsSection events={upcomingTrips} />
      <PastTripsSection events={pastTrips} />
    </>
  )
}
