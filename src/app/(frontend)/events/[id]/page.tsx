import { notFound } from 'next/navigation'

import { getEventById } from '@/queries/events'
import { EventPage } from './_components/EventPage'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(id)

  if (!event || event.status !== 'published') {
    notFound()
  }

  return <EventPage event={event} />
}
