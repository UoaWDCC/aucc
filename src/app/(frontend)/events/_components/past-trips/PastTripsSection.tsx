import { EventDTO } from '@/queries/events'
import { PastTripsCard } from './PastTripsCard'
import { PastTripsHeader } from './PastTripsHeader'

type PastTripsSectionProps = {
  events: EventDTO[]
}

export function PastTripsSection({ events }: PastTripsSectionProps) {
  if (!events || events.length === 0) return null

  return (
    <div className="bg-abyss my-31 h-auto w-full">
      <PastTripsHeader />
      <div className="mb-45 flex flex-col gap-10">
        {events.map((event, index) => (
          <PastTripsCard key={event.id || index} event={event} />
        ))}
      </div>
    </div>
  )
}
