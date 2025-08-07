'use client'

import React, { Suspense } from 'react'

import { Event } from '@/payload-types'
import { EventsIntroSection } from './EventsIntro/EventsIntroSection'
import { TripsSection } from './Trips/UpcomingTripsSection'
import { UpcomingSection } from './Upcoming/UpcomingEvents'

interface EventsPageProps {
  events: Event[]
}

export function EventsPage({ events }: EventsPageProps) {
  return (
    <>
      <EventsIntroSection />
      <UpcomingSection />
      <TripsSection events={events} />
    </>
  )
}
