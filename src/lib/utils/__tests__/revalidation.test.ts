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
      expect(result.sort()).toEqual(
        ['events', 'media', 'rivers', 'tags'].sort(),
      )
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

  describe('relationships between collections', () => {
    it('refreshes the gallery when a tag changes', () => {
      expect(cacheTags.gallery.relatedTags).toContain('tags')
    })

    it('refreshes trip reports when an exec or event changes', () => {
      expect(cacheTags.tripReports.relatedTags).toEqual(
        expect.arrayContaining(['execs', 'events', 'rivers', 'tags']),
      )
    })

    it('refreshes events when a river or tag changes', () => {
      expect(cacheTags.events.relatedTags).toEqual(
        expect.arrayContaining(['rivers', 'tags']),
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
