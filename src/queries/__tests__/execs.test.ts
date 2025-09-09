import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getExecs } from '@/queries/execs'

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

describe('Exec queries', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  describe('getExecs', () => {
    it('should fetch execs with default parameters', async () => {
      const mockResponse = {
        docs: [{ id: '1', name: 'Test Exec', role: 'test' }],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 1,
      }

      mockPayloadClient.find.mockResolvedValue(mockResponse)
      const result = await getExecs()

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'execs',
        page: 1,
        limit: 10,
        sort: 'name',
      })
      expect(result).toEqual({
        execs: mockResponse.docs,
        hasNextPage: mockResponse.hasNextPage,
        nextPage: mockResponse.nextPage,
        totalDocs: mockResponse.totalDocs,
      })
    })

    it('should fetch execs with custom parameters', async () => {
      const mockResponse = {
        docs: [{ id: '1', name: 'Test Exec', role: 'test' }],
        hasNextPage: true,
        nextPage: 3,
        totalDocs: 25,
      }

      mockPayloadClient.find.mockResolvedValue(mockResponse)
      const result = await getExecs({ page: 2, limit: 20, sort: '-createdAt' })

      expect(mockPayloadClient.find).toHaveBeenCalledWith({
        collection: 'execs',
        page: 2,
        limit: 20,
        sort: '-createdAt',
      })
      expect(result).toEqual({
        execs: mockResponse.docs,
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
      const result = await getExecs()

      expect(result.execs).toHaveLength(0)
      expect(result.totalDocs).toBe(0)
    })
  })
})
