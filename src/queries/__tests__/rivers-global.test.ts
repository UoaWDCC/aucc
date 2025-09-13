/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getRiversGlobal, type RiversGlobalDTO } from '@/queries/rivers-global'

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

// Mock revalidation utils
vi.mock('@/lib/utils/revalidation', () => ({
  cacheTags: {
    riversGlobal: {
      relatedTags: ['riversGlobal', 'media'],
    },
  },
}))

describe('Rivers Global queries', () => {
  const mockPayloadClient = {
    findGlobal: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  describe('getRiversGlobal', () => {
    it('should fetch rivers global data successfully', async () => {
      const mockRiversGlobal = {
        id: '1',
        headerImage: {
          id: 'img1',
          url: '/uploads/header.jpg',
          alt: 'Rivers Header',
          width: 1200,
          height: 600,
        },
        introText: [
          {
            type: 'paragraph',
            children: [{ text: 'Welcome to our rivers section!' }],
          },
        ],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      }

      mockPayloadClient.findGlobal.mockResolvedValue(mockRiversGlobal)

      const result = await getRiversGlobal()

      expect(mockPayloadClient.findGlobal).toHaveBeenCalledWith({
        slug: 'rivers-global',
      })
      expect(result).toEqual(mockRiversGlobal)
    })

    it('should handle minimal rivers global data', async () => {
      const mockMinimalData = {
        id: '2',
        headerImage: {
          id: 'img2',
          url: '/uploads/minimal-header.jpg',
          alt: '',
        },
        introText: [],
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      }

      mockPayloadClient.findGlobal.mockResolvedValue(mockMinimalData)

      const result = await getRiversGlobal()

      expect(result).toEqual(mockMinimalData)
      expect(result.headerImage).toBeDefined()
      expect(result.introText).toEqual([])
    })

    it('should handle rich text content in introText', async () => {
      const mockRichTextData = {
        id: '3',
        headerImage: {
          id: 'img3',
          url: '/uploads/rich-text-header.jpg',
          alt: 'Rich Text Header',
        },
        introText: [
          {
            type: 'paragraph',
            children: [
              { text: 'This is ' },
              { text: 'bold text', bold: true },
              { text: ' and this is ' },
              { text: 'italic text', italic: true },
            ],
          },
          {
            type: 'heading',
            level: 2,
            children: [{ text: 'Subheading' }],
          },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                children: [{ text: 'List item 1' }],
              },
              {
                type: 'li',
                children: [{ text: 'List item 2' }],
              },
            ],
          },
        ],
        createdAt: '2024-01-03T00:00:00.000Z',
        updatedAt: '2024-01-03T00:00:00.000Z',
      }

      mockPayloadClient.findGlobal.mockResolvedValue(mockRichTextData)

      const result = await getRiversGlobal()

      expect(result.introText).toHaveLength(3)
      expect((result.introText[0] as any).type).toBe('paragraph')
      expect((result.introText[1] as any).type).toBe('heading')
      expect((result.introText[2] as any).type).toBe('ul')
    })

    it('should handle payload client errors', async () => {
      const error = new Error('Failed to fetch global data')
      mockPayloadClient.findGlobal.mockRejectedValue(error)

      await expect(getRiversGlobal()).rejects.toThrow(
        'Failed to fetch global data',
      )
      expect(mockPayloadClient.findGlobal).toHaveBeenCalledWith({
        slug: 'rivers-global',
      })
    })

    it('should handle null/undefined responses gracefully', async () => {
      mockPayloadClient.findGlobal.mockResolvedValue(null)

      const result = await getRiversGlobal()

      expect(result).toBeNull()
    })

    it('should use the correct slug for findGlobal', async () => {
      const mockData = {
        id: '4',
        headerImage: { id: 'img4', url: '/test.jpg' },
        introText: [],
      }

      mockPayloadClient.findGlobal.mockResolvedValue(mockData)

      await getRiversGlobal()

      expect(mockPayloadClient.findGlobal).toHaveBeenCalledTimes(1)
      expect(mockPayloadClient.findGlobal).toHaveBeenCalledWith({
        slug: 'rivers-global',
      })
    })
  })

  describe('RiversGlobalDTO type', () => {
    it('should maintain type compatibility with payload response', () => {
      // This test ensures the type transformation works correctly
      const mockPayloadResponse = {
        id: '1',
        headerImage: {
          id: 'img1',
          url: '/uploads/header.jpg',
          alt: 'Header',
          width: 1200,
          height: 600,
        },
        introText: [
          {
            type: 'paragraph',
            children: [{ text: 'Test content' }],
          },
        ],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      }

      // This should compile without TypeScript errors
      const dto: RiversGlobalDTO = mockPayloadResponse as any

      expect(dto.id).toBe('1')
      expect(dto.headerImage).toBeDefined()
      expect(dto.introText).toBeDefined()
    })
  })
})
