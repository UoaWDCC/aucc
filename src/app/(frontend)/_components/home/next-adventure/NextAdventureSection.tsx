import { TripsCard } from '@/components/TripsCard/TripsCard'
import { getNextTrip } from '@/queries/events'
import { NextAdventureFallback } from './NextAdventureFallback'
import { NextAdventureHeader } from './NextAdventureHeader'
import { NextAdventureSectionBackground } from './NextAdventureSectionBackground'

export async function NextAdventureSection() {
  const event = await getNextTrip()

  return (
    <NextAdventureSectionBackground>
      <NextAdventureHeader />
      {event ? (
        <TripsCard event={event} mode="upcoming" bg="cream" />
      ) : (
        <NextAdventureFallback />
      )}
    </NextAdventureSectionBackground>
  )
}
