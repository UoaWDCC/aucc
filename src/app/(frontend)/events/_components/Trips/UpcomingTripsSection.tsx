import { Event } from '@/payload-types'
import { TripsCard } from './TripsCard'
import { TripsSectionBackground } from './TripsSectionBackground'

type TripsSectionProps = {
  events: Event[]
}

export function TripsSection({ events }: TripsSectionProps) {
  return (
    <TripsSectionBackground>
      <div className="flex flex-col items-center justify-center gap-5">
        {events.map((event, index) => (
          <TripsCard key={event.id || index} event={event} />
        ))}
      </div>
    </TripsSectionBackground>
  )
}
