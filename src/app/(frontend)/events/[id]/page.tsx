import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getEventById } from '@/queries/events'
import { EventPage } from './_components/EventPage'
import { EventPageFallback } from './_components/EventPageFallback'

export default async function SpecificEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(id)

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
