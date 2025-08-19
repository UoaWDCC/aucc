// src/queries/eventsglobal.ts
import 'server-only'

import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation' // ← 그대로 사용(서버 전용)

type MediaLike = { url?: string } | string | null
type LexicalJSON = any

type EventsGlobalDTO = {
  featuredImage?: MediaLike
  petrolCosts?: LexicalJSON | null
}

const _get = unstable_cache(
  async (): Promise<EventsGlobalDTO | null> => {
    try {
      const payload = await getPayloadClient()
      const data = await payload.findGlobal({ slug: 'events-global', depth: 2 })
      return data as EventsGlobalDTO
    } catch (e) {
      console.error('events-global fetch failed:', e)
      return null
    }
  },
  ['events-global'],
  { tags: [cacheTags.eventsGlobal.tag] },
)

export async function getEventsHeaderImageUrl(): Promise<string | null> {
  const g = await _get()
  const img = g?.featuredImage
  if (!img) return null
  return typeof img === 'string' ? img : (img.url ?? null)
}

export async function getEventsPetrolCosts(): Promise<LexicalJSON | null> {
  const g = await _get()
  return g?.petrolCosts ?? null
}
