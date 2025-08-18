import { EventDTO } from '@/queries/events'
import { PastTripsCard } from './PastTripsCard'
import { PastTripsHeader } from './PastTripsHeader'

type PastTripsSectionProps = {
  events: EventDTO[]
}

export function PastTripsSection({ events }: PastTripsSectionProps) {
  return (
    <div className="bg-abyss mt-31 h-auto w-full">
      <PastTripsHeader />
      <div className="mb-45 flex flex-col items-center justify-center gap-5">
        {events.map((event, index) => (
          <PastTripsCard key={event.id || index} event={event} />
        ))}
      </div>
    </div>
  )
}
