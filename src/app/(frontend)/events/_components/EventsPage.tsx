'use client'

import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { Media } from '@/payload-types'
import type { EventDTO } from '@/queries/events'
import { EventsHeaderSection } from './header/EventsHeaderSection'
import { UpcomingSection } from './intro/UpcomingEvents'
import { PastTripsSection } from './past-trips/PastTripsSection'
import { UpcomingTripsSection } from './upcoming-trips/UpcomingTripsSection'

interface EventsPageProps {
  events: EventDTO[]
  headerImage: Media
  petrolCosts: SerializedEditorState
}

export function EventsPage({
  events,
  headerImage,
  petrolCosts,
}: EventsPageProps) {
  const now = new Date()
  const upcomingTrips = events.filter((e) => new Date(e.startTime) >= now)
  const pastTrips = events.filter((e) => new Date(e.startTime) < now)

  return (
    <>
      <EventsHeaderSection headerImage={headerImage} />
      <UpcomingSection petrolCosts={petrolCosts} />
      <UpcomingTripsSection events={upcomingTrips} />
      <PastTripsSection events={pastTrips} />
    </>
  )
}
