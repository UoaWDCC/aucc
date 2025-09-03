import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { TripReport } from '@/payload-types'
import { getTripReports } from '@/queries/trip-reports'
import { getTripReportBySlug } from '../trip-reports'

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

describe('Trip Report queries', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  describe('getTripReports', () => {
    it('should fetch trip reports with default parameters', async () => {
      const mockResponse = {
        docs: [{ id: '1', title: 'Test Trip' }],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 1,
      }

      mockPayloadClient.find.mockResolvedValue(mockResponse)

      const result = await getTripReports()

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'trip-reports',
        depth: 1,
        page: 1,
        limit: 10,
        sort: '-createdAt',
        where: {
          status: {
            equals: 'published',
          },
        },
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
        depth: 1,
        page: 2,
        limit: 20,
        sort: 'name',
        where: {
          status: {
            equals: 'published',
          },
        },
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

  describe('getTripReportBySlug', () => {
    it('should return null when trip report is not found', async () => {
      mockPayloadClient.find.mockResolvedValue({ docs: [] })

      const result = await getTripReportBySlug('non-existent')
      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'trip-reports',
        where: {
          and: [
            {
              slug: {
                equals: 'non-existent',
              },
            },
            {
              status: {
                equals: 'published',
              },
            },
          ],
        },
        limit: 1,
      })
      expect(result).toBeNull()
    })

    it('should return trip report when found', async () => {
      const mockTripReport: TripReport = {
        id: 1,
        title: 'Test Trip Report',
        slug: 'test-trip-report',
        status: 'published',
        authors: [],
        gallery: [],
        datePublished: '2025-03-15T00:00:00.000Z',
        featuredImage: 1,
        content: {
          root: {
            type: 'paragraph',
            children: [{ text: 'Test content', type: 'paragraph', version: 1 }],
            direction: 'ltr',
            format: 'left',
            indent: 0,
            version: 1,
          },
        },
        updatedAt: '2025-03-20T00:00:00.000Z',
        createdAt: '2025-03-01T00:00:00.000Z',
      }

      mockPayloadClient.find.mockResolvedValue({ docs: [mockTripReport] })

      const result = await getTripReportBySlug('test-trip-report')

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'trip-reports',
        where: {
          and: [
            {
              slug: {
                equals: 'test-trip-report',
              },
            },
            {
              status: {
                equals: 'published',
              },
            },
          ],
        },
        limit: 1,
      })
      expect(result).toEqual(mockTripReport)
    })
  })
})
