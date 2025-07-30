import Image from 'next/image'

import { PayloadImage } from '@/components/PayloadImage'
import { Skeleton } from '@/components/ui/skeleton'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { EventDTO } from '@/queries/events'
import { NextAdventureButtons } from './NextAdventureButtons'
import { NextAdventureDate } from './NextAdventureDate'
import { NextAdventureGrade } from './NextAdventureGrade'
import { NextAdventureLocation } from './NextAdventureLocation'

interface EventPageProps {
  event: EventDTO
}

export function NextAdventureCard({ event }: EventPageProps) {
  const riverGrade = event.river?.grade || null
  return (
    <div className="mx-4 md:mx-20 lg:mx-28">
      <div className="bg-cream/5 text-cream flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-4 md:flex-row-reverse md:px-9 md:pb-7 lg:px-14 lg:pb-11 xl:mx-auto xl:max-w-[1000px]">
        <div className="relative aspect-[302/192] h-[192px] w-[min(100%,302px)] flex-shrink-0 overflow-hidden rounded-md md:aspect-[195/164] md:h-[164px] md:w-[195px] lg:aspect-[325/274] lg:h-[274px] lg:w-[325px]">
          <Skeleton className="absolute inset-0 z-0" />

          <PayloadImage media={event.featuredImage} />
        </div>

        <div className="flex flex-col gap-4 md:mb-1 md:min-w-0 md:gap-0">
          <div className="flex flex-col gap-4 md:flex-col-reverse">
            <h2 className="font-heading text-left text-lg leading-tight md:mb-2 md:truncate md:text-lg lg:mb-4">
              {event?.title}
            </h2>
            <div className="flex w-full flex-wrap justify-between gap-4 md:w-fit lg:gap-7">
              {riverGrade && <NextAdventureGrade grade={riverGrade} />}
              <NextAdventureDate
                startTime={event.startTime}
                endTime={event.endTime}
              />
            </div>
          </div>
          <div className="font-body line-clamp-4 text-sm italic md:mb-2 md:text-sm lg:mb-5">
            {getPlainText(event.description)}
          </div>
          <NextAdventureLocation>{event.location}</NextAdventureLocation>
          <NextAdventureButtons eventId={event.id} />
        </div>
      </div>
    </div>
  )
}
