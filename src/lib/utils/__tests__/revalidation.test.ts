import { revalidateTag } from 'next/cache'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { cacheTags, getRevalidationTags } from '@/lib/utils/revalidation'

// Mock the revalidateTag function
vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

describe('Revalidation requests', () => {
  describe('getRevalidationTags', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('returns all related tags', () => {
      const result = getRevalidationTags('events')
      expect(result.sort()).toEqual(['events', 'media'].sort())
    })

    it('returns only the tag itself if no related tags', () => {
      expect(getRevalidationTags('media')).toEqual(['media'])
    })

    it('handles complex custom relation graph', () => {
      const mockRelations = {
        events: ['media', 'rivers'],
        execs: ['media'],
        media: [],
        rivers: ['media'],
        tripReports: ['events', 'execs', 'rivers'],
      } as const

      expect(getRevalidationTags('tripReports', mockRelations).sort()).toEqual(
        ['tripReports', 'events', 'execs', 'rivers', 'media'].sort(),
      )
    })
  })

  describe('cacheTags', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('has correct relatedTags for collection with relation', () => {
      expect(cacheTags.execs.relatedTags.sort()).toEqual(
        ['execs', 'media'].sort(),
      )
    })

    it('has correct relatedTags for collection with no relation', () => {
      expect(cacheTags.execs.relatedTags.sort()).toEqual(
        ['execs', 'media'].sort(),
      )
    })

    it('calls revalidateTag with correct key', () => {
      cacheTags.rivers.revalidate()
      expect(revalidateTag).toHaveBeenCalledWith('rivers')
    })
  })
})
