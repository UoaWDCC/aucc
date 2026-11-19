import { notFound } from 'next/navigation'

import { mediaUrl } from '@/lib/metadata'
import { buildPageMetadata } from '@/lib/page-metadata'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { getEventById } from '@/queries/events'
import { EventPage } from './_components/EventPage'

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const event = await getEventById(id)

  // Don't reveal draft or archived events' titles
  if (!event || event.status !== 'published')
    return { title: 'Event not found' }

  return buildPageMetadata({
    title: event.title,
    description:
      getPlainText(event.description) ||
      `${event.title}, an AUCC event at ${event.location}.`,
    path: `/events/${event.id}`,
    image: mediaUrl(event.featuredImage),
  })
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const event = await getEventById(id)

  if (!event || event.status !== 'published') {
    notFound()
  }

  return <EventPage event={event} />
}
