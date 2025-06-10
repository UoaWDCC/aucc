import Image from 'next/image' // Add this import
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event } from '@/payload-types'
import { NextAdventureButtons } from './NextAdventureButtons'
import { NextAdventureDate } from './NextAdventureDate'
import { NextAdventureGrade } from './NextAdventureGrade'
import { NextAdventureLocation } from './NextAdventureLocation'

interface EventPageProps {
  event: Event
}

export function NextAdventureCard({ event }: EventPageProps) {
  return (
    <div className="p-4 pt-0">
      <div className="bg-cream/5 text-cream flex flex-col items-center gap-4 p-4">
        {event.featuredImage &&
          typeof event.featuredImage !== 'number' &&
          event.featuredImage.url && (
            <Image
              src={event.featuredImage.url}
              alt={event.title || ''}
              className="rounded-md"
              width={302}
              height={192}
            />
          )}
        <h2 className="font-heading truncate text-lg">{event?.title}</h2>
        <div className="flex w-full justify-between">
          <NextAdventureGrade>3</NextAdventureGrade>
          {event.startTime && event.endTime && (
            <NextAdventureDate
              startTime={event.startTime}
              endTime={event.endTime}
            />
          )}
        </div>
        <div className="font-body text-sm italic">
          {event?.description && <RichText data={event.description} />}
        </div>
        <NextAdventureLocation>{event?.location}</NextAdventureLocation>
        <NextAdventureButtons eventId={event.id}></NextAdventureButtons>
      </div>
    </div>
  )
}
