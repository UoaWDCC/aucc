import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getAllEvents, getEventBySlug } from '@/queries/events'

// Mock the payload client
vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

describe('Event queries', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  describe('getAllEvents', () => {
    it('should fetch events with default parameters', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Mock Event', startTime: '2025-06-01T10:00:00Z' },
        ],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 1,
      }

      mockPayloadClient.find.mockResolvedValue(mockResponse)

      const result = await getAllEvents()

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'events',
        where: {
          _status: { equals: 'published' },
        },
        page: 1,
        limit: 10,
        sort: '-startTime',
      })

      expect(result).toEqual({
        events: mockResponse.docs,
        hasNextPage: false,
        nextPage: null,
        totalDocs: 1,
      })
    })

    it('should handle no events found', async () => {
      mockPayloadClient.find.mockResolvedValue({
        docs: [],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 0,
      })

      const result = await getAllEvents()

      expect(result.events).toHaveLength(0)
    })
  })

  describe('getEventBySlug', () => {
    it('should return null when event not found', async () => {
      mockPayloadClient.find.mockResolvedValue({ docs: [] })

      const result = await getEventBySlug('missing-event')

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'events',
        where: {
          slug: { equals: 'missing-event' },
        },
      })

      expect(result).toBeNull()
    })

    it('should return event when found', async () => {
      const mockEvent = {
        id: 'e1',
        title: 'Test Event',
        startTime: '2025-06-01T10:00:00Z',
        slug: 'test-event',
      }

      mockPayloadClient.find.mockResolvedValue({ docs: [mockEvent] })

      const result = await getEventBySlug('test-event')

      expect(result).toEqual(mockEvent)
    })
  })
})
