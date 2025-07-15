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
    <div className="p-4 pt-0 md:px-24">
      <div className="bg-cream/5 text-cream flex flex-col items-center gap-4 rounded-2xl p-4 md:flex-row-reverse md:pr-5 md:pb-7 md:pl-12 lg:pr-9 lg:pb-11 lg:pl-20 xl:mx-auto xl:max-w-[953px]">
        <div>
          {event.featuredImage &&
            typeof event.featuredImage !== 'number' &&
            event.featuredImage.url && (
              <div className="relative aspect-[302/192] h-[192px] w-full overflow-hidden md:aspect-[195/164] md:h-[164px] lg:aspect-[325/274] lg:h-[274px]">
                <Image
                  src={event.featuredImage.url}
                  alt={event.title || ''}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}
        </div>
        <div className="flex flex-col gap-4 md:mb-1 md:gap-0">
          <div className="md:flex md:flex-col-reverse">
            <h2 className="font-heading truncate text-lg md:mb-2 md:text-xs lg:mb-4 lg:text-lg">
              {event?.title}
            </h2>
            <div className="flex w-full justify-between md:mb-5 md:w-fit md:gap-[17.4px] lg:gap-7">
              <NextAdventureGrade>3</NextAdventureGrade>
              {event.startTime && event.endTime && (
                <NextAdventureDate
                  startTime={event.startTime}
                  endTime={event.endTime}
                />
              )}
            </div>
          </div>
          <div className="font-body text-sm italic md:mb-2 md:text-[9px] lg:mb-5 lg:text-sm">
            {event?.description && <RichText data={event.description} />}
          </div>
          <NextAdventureLocation>{event?.location}</NextAdventureLocation>
          <NextAdventureButtons eventId={event.id}></NextAdventureButtons>
        </div>
      </div>
    </div>
  )
}
