import { notFound } from 'next/navigation'

import { RichTextRenderer } from '@/components/RichText'
import { getEventBySlug } from '@/queries/events'

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) return notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
      <p className="text-sm text-gray-600">
        {event.startTime && new Date(event.startTime).toLocaleDateString()} ·{' '}
        {event.location}
      </p>

      <div className="mt-6">
        {event.description && <RichTextRenderer data={event.description} />}
      </div>
    </main>
  )
}
