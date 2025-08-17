import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event, Tag } from '@/payload-types'
import { EventDTO } from '@/queries/events'
import { EventGallerySection } from './EventGallery/EventGallerySection'
import { SpecificEventIntroSection } from './SpecificEventIntro/SpecificEventIntroSection'
import { TicketInformationSection } from './SpecificEventTicketInfo/TicketInfo'

interface EventPageProps {
  event: EventDTO
}

export function EventPage({ event }: EventPageProps) {
  const tagName =
    event.tag && typeof event.tag === 'object'
      ? (event.tag as Tag).name
      : undefined
  return (
    <>
      <SpecificEventIntroSection event={event} />
      <TicketInformationSection event={event} />
      {tagName && <EventGallerySection tagName={tagName} />}
    </>
  )
}
