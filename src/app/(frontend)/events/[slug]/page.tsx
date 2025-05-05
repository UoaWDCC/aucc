import { Suspense } from 'react'

import { getEventBySlug } from '@/queries/events'
import { EventPage } from './_components/EventPage'
import { EventPageFallback } from './_components/EventPageFallback'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default async function SpecificEventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await delay(2000)
  const { slug } = await params

  const event = await getEventBySlug(slug)

  if (!event || event.status !== 'published') {
    return <div>Event not found</div>
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
