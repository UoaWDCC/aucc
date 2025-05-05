import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getEventBySlug } from '@/queries/events'
import { EventPage } from './_components/EventPage'
import { EventPageFallback } from './_components/EventPageFallback'

export default async function SpecificEventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event || event.status !== 'published') {
    notFound()
  }

  return (
    <div>
      <div>
        <Suspense fallback={<EventPageFallback />}>
          <EventPage event={event} />
        </Suspense>
      </div>
    </div>
  )
}
