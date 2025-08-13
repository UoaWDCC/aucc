'use client'

import React from 'react'

import { Event } from '@/payload-types'
import { EventsIntroSection } from './EventsIntro/EventsIntroSection'
import { UpcomingTripsSection } from './Trips/UpcomingTripsSection'
import { UpcomingSection } from './Upcoming/UpcomingEvents'

interface EventsPageProps {
  events: Event[]
}

export function EventsPage({ events }: EventsPageProps) {
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime)
    const currentDate = new Date()
    return eventDate >= currentDate
  })
  return (
    <>
      <EventsIntroSection />
      <UpcomingSection />
      <UpcomingTripsSection events={upcomingEvents} />
    </>
  )
}
