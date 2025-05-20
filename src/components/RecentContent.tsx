import { getPayload } from 'payload'

import config from '@/payload.config'
import { Event, TripReport } from '../payload-types'

export function RecentContent() {
  const payload = await getPayload({ config })

  let events: Event[] = []
  let trips: TripReport[] = []
  let error: string | null = null

  try {
    const eventsRes = await payload.find({
      collection: 'events',
      limit: 3,
      sort: '-createdAt',
    })

    const tripsRes = await payload.find({
      collection: 'trip-reports',
      limit: 3,
      sort: '-createdAt',
    })

    events = eventsRes.docs
    trips = tripsRes.docs
  } catch (err) {
    console.error(err)
    error = 'Failed to load content.'
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <>
      <section>
        <h2>Recent Events</h2>
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              {e.title} — {new Date(e.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent Trip Reports</h2>
        <ul>
          {trips.map((t) => (
            <li key={t.id}>
              {t.title} — {new Date(t.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
