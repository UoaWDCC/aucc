import { EventDTO } from '@/queries/events'
import { EventGallerySection } from './EventGallery/EventGallerySection'
import { SpecificEventIntroSection } from './SpecificEventIntro/SpecificEventIntroSection'
import { TicketInformationSection } from './SpecificEventTicketInfo/TicketInfo'

interface EventPageProps {
  event: EventDTO
}

export function EventPage({ event }: EventPageProps) {
  const tagName = event.tag?.name
  return (
    <>
      <SpecificEventIntroSection event={event} />
      <TicketInformationSection event={event} />
      {tagName && <EventGallerySection tagName={tagName} />}
    </>
  )
}
