import { TripsCard } from '@/components/TripsCard/TripsCard'
import { EventDTO } from '@/queries/events'
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
          <TripsCard
            key={event.id || index}
            event={event}
            mode="past"
            bg="cream"
          />
        ))}
      </div>
    </div>
  )
}
