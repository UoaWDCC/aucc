import { getRecentEvents } from '@/queries/events'
import { getRecentTripReports } from '@/queries/tripReports'
import { Event, TripReport } from '../payload-types'

export async function RecentContent() {
  const events: Event[] | null = await getRecentEvents()
  const trips: TripReport[] | null = await getRecentTripReports()

  if (!events || !trips) {
    return <p className="text-red-500">Failed to load content.</p>
  }

  return (
    <>
      <section>
        <h2 className="text-lg font-semibold">Recent Events</h2>
        <ul className="list-disc pl-5">
          {events.map((e) => (
            <li key={e.id}>
              {e.title} — {new Date(e.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Recent Trip Reports</h2>
        <ul className="list-disc pl-5">
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
