import { equal } from 'assert'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getRiverBySlug } from '../rivers'
import { getTripReportBySlug } from '../trip-reports'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

describe('Trip report queries', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
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
      const mockTripReport = {
        id: '1',
        title: 'Test Trip Report',
        slug: 'test-trip-report',
        status: 'published',
        author: [
          {
            id: 'exec001',
            name: 'Test Exec',
          },
        ],
        tripDate: '2025-03-15T00:00:00.000Z',
        location: 'Test river',
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
