import { GradeBadge } from '@/components/GradeBadge'
import { TripsCardButtons } from '@/components/TripsCard/TripsCardButtons'
import { TripsCardDate } from '@/components/TripsCard/TripsCardDate'
import { TripsCardImage } from '@/components/TripsCard/TripsCardImage'
import { TripsCardLocation } from '@/components/TripsCard/TripsCardLocation'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { EventDTO } from '@/queries/events'

type UpcomingTripsCardProps = {
  event: EventDTO
}

export function UpcomingTripsCard({ event }: UpcomingTripsCardProps) {
  const riverGrade = event.river?.grade ?? null

  return (
    <div
      key={event.id}
      className="bg-abyss text-cream relative flex flex-col-reverse justify-center gap-5 rounded-2xl px-5 py-9 md:flex-row md:gap-24 md:px-16 lg:mx-30"
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-6">
          <h2 className="font-heading mb-4 text-xl">{event.title}</h2>
          <div className="flex flex-row gap-7">
            {riverGrade && <GradeBadge grade={riverGrade} />}
            <TripsCardDate
              startTime={event.startTime}
              endTime={event.endTime}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-body text-cream/90 line-clamp-4 text-sm italic">
              {getPlainText(event.description)}
            </p>
            <TripsCardLocation>{event.location}</TripsCardLocation>
            <TripsCardButtons eventId={event.id} />
          </div>
        </div>
      </div>
      <div>
        <TripsCardImage url={event.featuredImage?.url || ''} />
      </div>
    </div>
  )
}
