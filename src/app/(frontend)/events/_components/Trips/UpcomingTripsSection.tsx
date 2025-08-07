import { Event } from '@/payload-types'
import { TripsCard } from './TripsCard'
import { UpcomingTripsSectionBackground } from './UpcomingTripsSectionBackground'

type TripsSectionProps = {
  events: Event[]
}

export function UpcomingTripsSection({ events }: TripsSectionProps) {
  return (
    <UpcomingTripsSectionBackground>
      <div className="flex flex-col items-center justify-center gap-5">
        {events.map((event, index) => (
          <TripsCard key={event.id || index} event={event} />
        ))}
      </div>
    </UpcomingTripsSectionBackground>
  )
}
