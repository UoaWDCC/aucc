'use client'

import React, { Suspense } from 'react'

import { Event } from '@/payload-types'
import { EventsIntroSection } from './EventsIntro/EventsIntroSection'

interface EventsPageProps {
  events: Event[]
}

export function EventsPage({ events }: EventsPageProps) {
  return (
    <>
      <EventsIntroSection />
    </>
  )
}
