import { GradeBadge } from '@/components/GradeBadge'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { EventDTO } from '@/queries/events'
import { TripsCardDate } from '../upcoming-trips/TripsCardDate'
import { TripsCardImage } from '../upcoming-trips/TripsCardImage'
import { TripsCardLocation } from '../upcoming-trips/TripsCardLocation'

type PastTripsCardProps = {
  event: EventDTO
}

export function PastTripsCard({ event }: PastTripsCardProps) {
  const riverGrade = event.river?.grade || null

  return (
    <div className="bg-cream/5 text-cream mx-5 h-full rounded-2xl px-5 pt-8 pb-10 md:mx-10 md:px-15 lg:mx-40">
      <div className="flex flex-col-reverse md:flex-row md:gap-15 lg:gap-20">
        {event.featuredImage?.url && (
          <TripsCardImage url={event.featuredImage.url} />
        )}
        <div>
          <div className="flex flex-col-reverse gap-6">
            <h2 className="font-heading mb-4 text-xl">{event.title}</h2>
            <div className="flex flex-row gap-7">
              {riverGrade && <GradeBadge grade={riverGrade} />}
              <TripsCardDate
                startTime={event.startTime}
                endTime={event.endTime}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-body line-clamp-4 text-sm italic">
              {getPlainText(event.description)}
            </p>
            <TripsCardLocation>{event.location}</TripsCardLocation>
          </div>
        </div>
      </div>
    </div>
  )
}
