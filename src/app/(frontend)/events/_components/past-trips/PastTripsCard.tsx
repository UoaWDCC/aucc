import { EventDTO } from '@/queries/events'
import { TripsCardImage } from '../upcoming-trips/TripsCardImage'
import { PastTripsCardContent } from './PastTripsCardContent'

type TripsCardProps = {
  event: EventDTO
}

export function PastTripsCard({ event }: TripsCardProps) {
  return (
    <div className="bg-cream/5 text-cream flex max-w-6xl flex-col-reverse justify-between gap-5 rounded-2xl px-16 py-9 md:flex-row md:gap-24 lg:min-w-6xl">
      {event.featuredImage?.url && (
        <TripsCardImage url={event.featuredImage.url} />
      )}
      <PastTripsCardContent event={event}></PastTripsCardContent>
    </div>
  )
}
