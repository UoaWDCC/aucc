import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getTripReports } from '@/queries/trip-reports'

// Mock the payload client
vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

describe('getTripReports', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  it('should fetch trip reports with default parameters', async () => {
    const mockResponse = {
      docs: [{ id: '1', title: 'Test Trip', location: 'Imaginary Land' }],
      hasNextPage: false,
      nextPage: null,
      totalDocs: 1,
    }

    mockPayloadClient.find.mockResolvedValue(mockResponse)

    const result = await getTripReports()

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'trip-reports',
      page: 1,
      limit: 10,
      sort: '-createdAt',
    })
    expect(result).toEqual({
      tripReports: mockResponse.docs,
      hasNextPage: mockResponse.hasNextPage,
      nextPage: mockResponse.nextPage,
      totalDocs: mockResponse.totalDocs,
    })
  })

  it('should fetch trip reports with custom parameters', async () => {
    const mockResponse = {
      docs: [{ id: '2', title: 'Another Trip', location: 'Wonderland' }],
      hasNextPage: true,
      nextPage: 3,
      totalDocs: 25,
    }

    mockPayloadClient.find.mockResolvedValue(mockResponse)

    const result = await getTripReports({ page: 2, limit: 20, sort: 'name' })

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'trip-reports',
      page: 2,
      limit: 20,
      sort: 'name',
    })
    expect(result).toEqual({
      tripReports: mockResponse.docs,
      hasNextPage: mockResponse.hasNextPage,
      nextPage: mockResponse.nextPage,
      totalDocs: mockResponse.totalDocs,
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

    const result = await getTripReports()

    expect(result.tripReports).toHaveLength(0)
    expect(result.totalDocs).toBe(0)
  })
})
