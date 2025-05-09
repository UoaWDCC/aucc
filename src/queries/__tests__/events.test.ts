import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getAllEvents } from '@/queries/events'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

describe('getAllEvents', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

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

  it('should fetch events with custom parameters', async () => {
    const mockResponse = {
      docs: [
        { id: '2', title: 'Another Event', startTime: '2025-07-01T10:00:00Z' },
      ],
      hasNextPage: true,
      nextPage: 3,
      totalDocs: 25,
    }

    mockPayloadClient.find.mockResolvedValue(mockResponse)

    const result = await getAllEvents({ page: 2, limit: 20, sort: 'title' })

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'events',
      page: 2,
      limit: 20,
      sort: 'title',
    })

    expect(result).toEqual({
      events: mockResponse.docs,
      hasNextPage: true,
      nextPage: 3,
      totalDocs: 25,
    })
  })

  it('should handle empty result sets', async () => {
    const mockResponse = {
      docs: [],
      hasNextPage: false,
      nextPage: null,
      totalDocs: 0,
    }

    mockPayloadClient.find.mockResolvedValue(mockResponse)

    const result = await getAllEvents()

    expect(result.events).toHaveLength(0)
    expect(result.totalDocs).toBe(0)
  })
})
