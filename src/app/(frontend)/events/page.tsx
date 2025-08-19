import { getEvents } from '@/queries/events'
import { EventsPage } from './_components/EventsPage'

export default async function Page() {
  const { events } = await getEvents({
    sort: 'startTime',
    tripsOnly: true,
  })

  return <EventsPage events={events} />
}
