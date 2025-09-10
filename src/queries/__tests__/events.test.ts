import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getEventById, getEvents } from '@/queries/events'

// Mock the payload client
vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

// Mock the cache
vi.mock('next/cache', async () => {
  return {
    unstable_cache: (fn: any) => fn,
  }
})

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

    const result = await getEvents()

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'events',
      page: 1,
      limit: 10,
      sort: '-startTime',
      where: {},
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

    const result = await getEvents({
      page: 2,
      limit: 20,
      sort: 'title',
      tripsOnly: false,
    })

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'events',
      page: 2,
      limit: 20,
      sort: 'title',
      where: {},
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

    const result = await getEvents()

    expect(result.events).toHaveLength(0)
    expect(result.totalDocs).toBe(0)
  })
})

describe('getEventById', () => {
  const mockPayloadClient = {
    findByID: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  it('should return null if event is not found', async () => {
    mockPayloadClient.findByID.mockResolvedValue(null)

    const result = await getEventById('non-existent-id')

    expect(mockPayloadClient.findByID).toHaveBeenCalledWith({
      collection: 'events',
      id: 'non-existent-id',
    })
    expect(result).toBeNull()
  })

  it('should return the event if found', async () => {
    const mockEvent = {
      id: '1',
      title: 'Sample Event',
    }

    mockPayloadClient.findByID.mockResolvedValue(mockEvent)

    const result = await getEventById('1')

    expect(mockPayloadClient.findByID).toHaveBeenCalledWith({
      collection: 'events',
      id: '1',
    })
    expect(result).toEqual(mockEvent)
  })

  it('should return null and log error if findByID throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockPayloadClient.findByID.mockRejectedValue(new Error('DB failure'))

    const result = await getEventById('failing-id')

    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch event by ID:',
      expect.any(Error),
    )

    consoleSpy.mockRestore()
  })
})

describe('getNextTrip', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  it('should return the next upcoming event', async () => {
    const mockEvent = {
      id: '1',
      title: 'Next Adventure',
      startTime: '2030-01-01T00:00:00Z',
    }

    mockPayloadClient.find.mockResolvedValue({
      docs: [mockEvent],
    })

    const { getNextTrip } = await import('@/queries/events')
    const result = await getNextTrip()

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'events',
      limit: 1,
      sort: 'startTime',
      where: {
        startTime: {
          greater_than: expect.any(String),
        },
        eventType: {
          equals: 'trip',
        },
      },
    })

    expect(result).toEqual(mockEvent)
  })

  it('should return null if no upcoming events are found', async () => {
    mockPayloadClient.find.mockResolvedValue({
      docs: [],
    })

    const { getNextTrip } = await import('@/queries/events')
    const result = await getNextTrip()

    expect(result).toBeNull()
  })

  it('should return null and log error if find throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockPayloadClient.find.mockRejectedValue(
      new Error('Error fetching next event'),
    )

    const { getNextTrip } = await import('@/queries/events')
    const result = await getNextTrip()

    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch next event',
      expect.any(Error),
    )

    consoleSpy.mockRestore()
  })
})
