'use client'

import React from 'react'

import { EventsIntroSection } from './EventsIntro/EventsIntroSection'
import { UpcomingSection } from './Upcoming/UpcomingEvents'

export function EventsPage() {
  return (
    <>
      <EventsIntroSection />
      <UpcomingSection />
    </>
  )
}
