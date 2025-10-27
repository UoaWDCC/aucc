import { TripsCard } from '@/components/TripsCard/TripsCard'
import { EventDTO } from '@/queries/events'
import { UpcomingTripsSectionBackground } from './UpcomingTripsSectionBackground'

type TripsSectionProps = {
  events: EventDTO[]
}

export function UpcomingTripsSection({ events }: TripsSectionProps) {
  if (!events || events.length === 0) return null

  return (
    <UpcomingTripsSectionBackground>
      <div className="flex flex-col gap-5 px-5">
        <div className="flex flex-col items-center justify-center gap-5">
          {events.map((event, index) => (
            <TripsCard
              key={event.id || index}
              event={event}
              mode="upcoming"
              bg="abyss"
            />
          ))}
        </div>
      </div>
    </UpcomingTripsSectionBackground>
  )
}
