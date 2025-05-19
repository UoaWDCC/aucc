import Image from 'next/image'
import Link from 'next/link'

import { getPlainText } from '@/lib/utils/getPlainText'
import type { Event } from '@/payload-types'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block border p-2 hover:bg-gray-50"
    >
      <div className="h-48 bg-gray-200">
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
      <div className="mt-2">
        <h3 className="font-medium">{event.title}</h3>
        {event.startTime && (
          <p className="text-sm text-gray-600">
            {new Date(event.startTime).toLocaleDateString()} · {event.location}
          </p>
        )}
        {event.description && (
          <p className="line-clamp-2 text-gray-600">
            {getPlainText(event.description)}
          </p>
        )}
      </div>
    </Link>
  )
}
