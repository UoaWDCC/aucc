'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// 👇 Suspense 내부에 렌더링용 분리 컴포넌트
function EventList() {
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1')
    setPage(pageParam)

    const fetchEvents = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(
          `http://localhost:3000/api/events?limit=10&page=${pageParam}&sort=startTime&where[status][equals]=published`,
        )
        if (!res.ok) throw new Error()

        const data = await res.json()
        setEvents(data.docs)
        setHasNext(data.page < data.totalPages)
        setHasPrev(data.page > 1)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [searchParams])

  if (loading) return <p className="p-6">⏳ Loading events...</p>
  if (error)
    return <p className="p-6 text-red-600">❌ Failed to load events.</p>

  return (
    <>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="rounded-md border p-4 shadow-sm">
              <Link href={`/events/${event.slug || ''}`}>
                <h2 className="text-lg font-bold text-blue-600 hover:underline">
                  {event.title}
                </h2>
              </Link>
              <p>{new Date(event.startTime).toLocaleString()}</p>
              {event.location && <p>{event.location}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        {hasPrev && (
          <Link
            href={`/events?page=${page - 1}`}
            className="text-blue-600 hover:underline"
          >
            ← Previous
          </Link>
        )}
        {hasNext && (
          <Link
            href={`/events?page=${page + 1}`}
            className="text-blue-600 hover:underline"
          >
            Next →
          </Link>
        )}
      </div>
    </>
  )
}

export default function EventsPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">🎉 Events Page</h1>
      <p className="mb-4 text-gray-600">List of events:</p>
      <Suspense fallback={<p>Loading events...</p>}>
        <EventList />
      </Suspense>
    </div>
  )
}

