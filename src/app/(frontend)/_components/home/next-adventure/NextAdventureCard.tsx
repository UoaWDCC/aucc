import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event, River } from '@/payload-types'
import { NextAdventureButtons } from './NextAdventureButtons'
import { NextAdventureDate } from './NextAdventureDate'
import { NextAdventureGrade } from './NextAdventureGrade'
import { NextAdventureLocation } from './NextAdventureLocation'

interface EventPageProps {
  event: Event
}

export function NextAdventureCard({ event }: EventPageProps) {
  const riverGrade = (event.river as River)?.grade || null
  return (
    <div className="p-4 pt-0 md:px-24">
      <div className="bg-cream/5 text-cream flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-4 md:flex-row-reverse md:pr-5 md:pb-7 md:pl-12 lg:pr-9 lg:pb-11 lg:pl-20 xl:mx-auto xl:max-w-[953px]">
        <div className="relative aspect-[302/192] h-[192px] min-w-[302px] overflow-hidden rounded-md md:aspect-[195/164] md:h-[164px] md:min-w-[195px] lg:aspect-[325/274] lg:h-[274px] lg:min-w-[325px]">
          <div className="absolute inset-0 z-0 bg-gray-400" />

          {event.featuredImage &&
            typeof event.featuredImage !== 'number' &&
            event.featuredImage.url && (
              <Image
                src={event.featuredImage.url}
                alt={event.title || ''}
                fill
                className="z-10 object-cover"
              />
            )}
        </div>

        <div className="flex flex-col gap-4 md:mb-1 md:gap-0">
          <div className="md:flex md:flex-col-reverse">
            <h2 className="font-heading truncate text-lg md:mb-2 md:text-xs lg:mb-4 lg:text-lg">
              {event?.title}
            </h2>
            <div className="flex w-full justify-between md:mb-5 md:w-fit md:gap-4 lg:gap-7">
              {riverGrade && (
                <NextAdventureGrade>{riverGrade}</NextAdventureGrade>
              )}
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
          <NextAdventureButtons eventId={event.id} />
        </div>
      </div>
    </div>
  )
}
