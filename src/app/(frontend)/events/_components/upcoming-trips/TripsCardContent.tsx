import { GradeBadge } from '@/components/GradeBadge'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { EventDTO } from '@/queries/events'
import { TripsCardButtons } from './TripsCardButtons'
import { TripsCardDate } from './TripsCardDate'
import { TripsCardLocation } from './TripsCardLocation'

type TripsCardContentProps = {
  event: EventDTO
}

export function TripsCardContent({ event }: TripsCardContentProps) {
  const riverGrade = event.river?.grade || null
  return (
    <div>
      <div className="flex flex-col-reverse gap-6">
        <h2 className="font-heading mb-4 text-xl">{event.title}</h2>
        <div className="flex flex-row gap-7">
          {riverGrade && <GradeBadge grade={riverGrade} />}
          <TripsCardDate startTime={event.startTime} endTime={event.endTime} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-body line-clamp-4 text-sm italic">
          {getPlainText(event.description)}
        </p>
        <TripsCardLocation>{event.location}</TripsCardLocation>
        <TripsCardButtons eventId={event.id}></TripsCardButtons>
      </div>
    </div>
  )
}
