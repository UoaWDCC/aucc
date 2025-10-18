import { getEvents } from '@/queries/events'
import { getEventsGlobal } from '@/queries/events-global'
import { EventsPage } from './_components/EventsPage'

export default async function Page() {
  try {
    const { events } = await getEvents({
      sort: 'startTime',
      tripsOnly: true,
    })

    const { headerImage, petrolCosts } = await getEventsGlobal()

    return (
      <EventsPage
        events={events}
        headerImage={headerImage}
        petrolCosts={petrolCosts}
      />
    )
  } catch (error) {
    console.error('Error loading events page:', error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Events Page</h1>
          <p>Unable to load events data. Please try again later.</p>
        </div>
      </div>
    )
  }
}
