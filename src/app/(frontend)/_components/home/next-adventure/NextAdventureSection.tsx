import { getLatestEvent } from '@/queries/events'
import { NextAdventureCard } from './NextAdventureCard'
import { NextAdventureHeader } from './NextAdventureHeader'
import { NextAdventureSectionBackground } from './NextAdventureSectionBackground'

export async function NextAdventureSection() {
  const event = await getLatestEvent()
  if (!event) return null

  return (
    <NextAdventureSectionBackground>
      <NextAdventureHeader />
      <NextAdventureCard event={event} />
    </NextAdventureSectionBackground>
  )
}
