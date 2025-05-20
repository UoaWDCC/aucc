import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getRiverBySlug, getRivers } from '@/queries/rivers'

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

describe('River queries', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  describe('getRivers', () => {
    it('should fetch rivers with default parameters', async () => {
      const mockResponse = {
        docs: [{ id: '1', name: 'Test River', grade: '3' }],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 1,
      }

      // When the mockPayloadClient's `find` method is called, it should return the mockResponse
      mockPayloadClient.find.mockResolvedValue(mockResponse)

      const result = await getRivers()

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'rivers',
        page: 1,
        limit: 10,
        sort: 'grade',
      })
      expect(result).toEqual({
        rivers: mockResponse.docs,
        hasNextPage: mockResponse.hasNextPage,
        nextPage: mockResponse.nextPage,
        totalDocs: mockResponse.totalDocs,
      })
    })

    it('should fetch rivers with custom parameters', async () => {
      const mockResponse = {
        docs: [{ id: '1', name: 'Test River', grade: '3' }],
        hasNextPage: true,
        nextPage: 3,
        totalDocs: 25,
      }

      mockPayloadClient.find.mockResolvedValue(mockResponse)

      const result = await getRivers({ page: 2, limit: 20, sort: 'name' })

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'rivers',
        page: 2,
        limit: 20,
        sort: 'name',
      })
      expect(result).toEqual({
        rivers: mockResponse.docs,
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

      const result = await getRivers()

      expect(result.rivers).toHaveLength(0)
      expect(result.totalDocs).toBe(0)
    })
  })

  describe('getRiverBySlug', () => {
    it('should return null when river is not found', async () => {
      mockPayloadClient.find.mockResolvedValue({ docs: [] })

      const result = await getRiverBySlug('non-existent')

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'rivers',
        where: {
          slug: {
            equals: 'non-existent',
          },
        },
      })
      expect(result).toBeNull()
    })

    it('should return river when found', async () => {
      const mockRiver = {
        id: '1',
        name: 'Test River',
        grade: '3',
        slug: 'test-river',
      }
      mockPayloadClient.find.mockResolvedValue({ docs: [mockRiver] })

      const result = await getRiverBySlug('test-river')

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'rivers',
        where: {
          slug: {
            equals: 'test-river',
          },
        },
      })
      expect(result).toEqual(mockRiver)
    })
  })
})
