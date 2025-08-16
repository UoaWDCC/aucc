import { EventDTO } from '@/queries/events'
import { TripsCardContent } from './TripsCardContent'
import { TripsCardImage } from './TripsCardImage'

type TripsCardProps = {
  event: EventDTO
}

export function TripsCard({ event }: TripsCardProps) {
  return (
    <div className="bg-abyss text-cream flex max-w-6xl flex-row justify-between gap-24 rounded-2xl px-16 py-9 lg:min-w-6xl">
      <TripsCardContent event={event}></TripsCardContent>
      {event.featuredImage?.url && (
        <TripsCardImage url={event.featuredImage.url} />
      )}
    </div>
  )
}
