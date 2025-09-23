import { EventDTO } from '@/queries/events'
import { TripsCardContent } from './TripsCardContent'
import { TripsCardImage } from './TripsCardImage'

type TripsCardProps = {
  event: EventDTO
  mode: 'upcoming' | 'past'
  bg: 'cream' | 'abyss'
}

export function TripsCard({ event, mode, bg }: TripsCardProps) {
  const bgClass = bg === 'abyss' ? 'bg-abyss' : 'bg-cream/5'
  const flexDirection =
    mode === 'upcoming' ? 'md:flex-row' : 'md:flex-row-reverse'

  return (
    <div
      className={`${bgClass} text-cream mx-auto flex max-w-6xl flex-col-reverse justify-between gap-5 rounded-2xl px-16 py-9 ${flexDirection} md:gap-24 lg:min-w-6xl`}
    >
      <TripsCardContent event={event} mode={mode}></TripsCardContent>
      {event.featuredImage?.url && (
        <TripsCardImage url={event.featuredImage.url} />
      )}
    </div>
  )
}
