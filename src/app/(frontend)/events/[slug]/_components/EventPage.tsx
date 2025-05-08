import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event } from '@/payload-types'

interface EventPageProps {
  event: Event
}

export function EventPage({ event }: EventPageProps) {
  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">{event.title}</h1>
      <div className="mt-4 block border p-2">
        <div className="h-144 p-2">
          {event.featuredImage &&
            typeof event.featuredImage !== 'number' &&
            event.featuredImage.url && (
              <Image
                src={event.featuredImage.url}
                alt={event.title || ''}
                className="h-full w-full object-cover"
                width={300}
                height={200}
              />
            )}
        </div>
        <div className="p-2">
          {event.description && <RichText data={event.description} />}
          <div className="mt-4 text-center">
            {event.startTime && (
              <p>Start: {new Date(event.startTime).toLocaleString()}</p>
            )}
            {event.endTime && (
              <p>End: {new Date(event.endTime).toLocaleString()}</p>
            )}
            {event.location && <p>Location: {event.location}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
