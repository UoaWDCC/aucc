import { getNextTrip } from '@/queries/events'
import { NextAdventureCard } from './NextAdventureCard'
import { NextAdventureFallback } from './NextAdventureFallback'
import { NextAdventureHeader } from './NextAdventureHeader'
import { NextAdventureSectionBackground } from './NextAdventureSectionBackground'

export async function NextAdventureSection() {
  const event = await getNextTrip()

  return (
    <NextAdventureSectionBackground>
      <NextAdventureHeader />
      {event ? <NextAdventureCard event={event} /> : <NextAdventureFallback />}
    </NextAdventureSectionBackground>
  )
}
