import { EventDTO } from '@/queries/events'
import { PastAdventuresHeader } from './PastAdventuresHeader'
import { PastTripsCard } from './PastTripsCard'

type TripsSectionProps = {
  events: EventDTO[]
}

export function PastAdventuresSection({ events }: TripsSectionProps) {
  return (
    <div className="bg-abyss mt-31 h-auto w-full">
      <PastAdventuresHeader />
      <div className="mb-45 flex flex-col items-center justify-center gap-5">
        {events.map((event, index) => (
          <PastTripsCard key={event.id || index} event={event} />
        ))}
      </div>
    </div>
  )
}
