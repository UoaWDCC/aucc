import { EventDTO } from '@/queries/events'
import { TripsCardContent } from './TripsCardContent'
import { TripsCardImage } from './TripsCardImage'

type TripsCardProps = {
  event: EventDTO
}

export function TripsCard({ event }: TripsCardProps) {
  return (
    <div className="bg-abyss text-cream flex max-w-6xl flex-col-reverse justify-between gap-5 rounded-2xl px-16 py-9 md:flex-row md:gap-24 lg:min-w-6xl">
      <TripsCardContent event={event}></TripsCardContent>
      {event.featuredImage?.url && (
        <TripsCardImage url={event.featuredImage.url} />
      )}
    </div>
  )
}
