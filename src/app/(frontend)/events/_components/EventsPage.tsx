'use client'

import React from 'react'

import { EventDTO } from '@/queries/events'
import { EventsIntroSection } from './EventsIntro/EventsIntroSection'
import { PastAdventuresSection } from './PastAdventures/PastAdventuresSection'
import { UpcomingTripsSection } from './Trips/UpcomingTripsSection'
import { UpcomingSection } from './Upcoming/UpcomingEvents'

interface EventsPageProps {
  events: EventDTO[]
}

export function EventsPage({ events }: EventsPageProps) {
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime)
    const currentDate = new Date()
    return eventDate >= currentDate
  })
  const pastEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime)
    const currentDate = new Date()
    return eventDate < currentDate
  })

  const upcomingTrips = upcomingEvents.filter(
    (event) => event.eventType.toLowerCase() === 'trip',
  )
  const pastTrips = pastEvents.filter(
    (event) => event.eventType.toLowerCase() === 'trip',
  )

  return (
    <>
      <EventsIntroSection />
      <UpcomingSection />
      <UpcomingTripsSection events={upcomingTrips} />
      <PastAdventuresSection events={pastTrips} />
    </>
  )
}
