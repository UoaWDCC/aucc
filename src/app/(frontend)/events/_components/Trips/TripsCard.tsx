import Image from 'next/image'

import { getPlainText } from '@/lib/utils/get-plain-text'
import { Event } from '@/payload-types'
import { TripsCardButtons } from './TripsCardButtons'
import { TripsCardDate } from './TripsCardDate'
import { TripsCardGrade } from './TripsCardGrade'
import { TripsCardLocation } from './TripsCardLocation'

type TripsCardProps = {
  event: Event
}

export function TripsCard({ event }: TripsCardProps) {
  console.log(event.featuredImage)
  return (
    <div className="bg-abyss text-cream flex max-w-6xl flex-row gap-24 rounded-2xl px-16 py-9">
      <div>
        <div className="flex flex-col-reverse gap-6">
          <h2 className="font-heading mb-4 text-xl">{event.title}</h2>
          <div className="flex flex-row gap-7">
            <TripsCardGrade grade={3} />
            <TripsCardDate
              startTime={event.startTime}
              endTime={event.endTime}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-body line-clamp-4 text-sm italic">
            {getPlainText(event.description)}
          </p>
          <TripsCardLocation>{event.location}</TripsCardLocation>
          <TripsCardButtons eventId={event.id}></TripsCardButtons>
        </div>
      </div>
      {typeof event.featuredImage === 'object' && event.featuredImage?.url && (
        <div className="relative h-[251px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={event.featuredImage.url}
            alt="image"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}
