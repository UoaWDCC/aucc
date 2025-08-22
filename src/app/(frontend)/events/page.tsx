import { getEvents } from '@/queries/events'
import { getEventsGlobal } from '@/queries/events-global'
import { EventsPage } from './_components/EventsPage'

export default async function Page() {
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
}
