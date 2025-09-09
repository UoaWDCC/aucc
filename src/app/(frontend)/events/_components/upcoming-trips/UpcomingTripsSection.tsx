import Image from 'next/image'

import backgroundImage from '@/assets/upcoming-trip-background.webp'
import { EventDTO } from '@/queries/events'
import { UpcomingTripsCard } from './UpcomingTripsCard'

type TripsSectionProps = {
  events: EventDTO[]
}

export function UpcomingTripsSection({ events }: TripsSectionProps) {
  if (!events || events.length === 0) return null

  return (
    <div className="bg-water relative inset-0 flex min-h-[800px] w-full items-center justify-center py-20">
      <Image
        src={backgroundImage}
        alt="Upcoming trips background"
        fill
        className="absolute inset-0 object-cover"
      />
      <div className="relative z-10 mx-5 w-full md:mx-10">
        <div className="flex flex-col gap-10">
          {events.map((event) => (
            <UpcomingTripsCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
