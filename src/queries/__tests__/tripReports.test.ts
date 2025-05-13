import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { TripReport } from '@/payload-types'
import { getTripReports } from '@/queries/tripReports'
import { getTripReportBySlug } from '../tripReports'

// Mock the payload client
vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

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

  describe('getTripReportBySlug', () => {
    it('should return null when trip report is not found', async () => {
      mockPayloadClient.find.mockResolvedValue({ docs: [] })

      const result = await getTripReportBySlug('non-existent')
      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'trip-reports',
        where: {
          slug: {
            equals: 'non-existent',
          },
        },
      })
      expect(result).toBeNull()
    })

    it('should return trip report when found', async () => {
      const mockTripReport: TripReport = {
        id: 1,
        title: 'Test Trip Report',
        slug: 'test-trip-report',
        status: 'published',
        author: [
          {
            id: 1,
            name: 'Test Exec',
            role: 'Leader',
            email: 'testexec@example.com',
            updatedAt: '2025-03-10T00:00:00.000Z',
            createdAt: '2025-03-01T00:00:00.000Z',
          },
        ],
        tripDate: '2025-03-15T00:00:00.000Z',
        location: 'Test river',
        updatedAt: '2025-03-20T00:00:00.000Z',
        createdAt: '2025-03-01T00:00:00.000Z',
      }

      mockPayloadClient.find.mockResolvedValue({ docs: [mockTripReport] })

      const result = await getTripReportBySlug('test-trip-report')

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'trip-reports',
        where: {
          slug: {
            equals: 'test-trip-report',
          },
        },
      })
      expect(result).toEqual(mockTripReport)
    })
  })
})
