/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getGallery } from '@/queries/gallery'
import { GET } from './route'

vi.mock('@/queries/gallery', () => ({
  getGallery: vi.fn(),
}))

function makeRequest(query: string) {
  return new NextRequest(`http://localhost/api/gallery-images${query}`)
}

describe('GET /api/gallery-images', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 200 with images and hasMore true when more pages exist', async () => {
    const mockGallery = [{ id: '1', image: { url: 'test.jpg' } }]
    ;(getGallery as any).mockResolvedValue({
      gallery: mockGallery,
      hasNextPage: true,
      nextPage: 2,
      totalDocs: 20,
    })

    const response = await GET(makeRequest('?page=1&limit=10'))
    const body = await response.json()

    expect(getGallery).toHaveBeenCalledWith({ page: 1, limit: 10 })
    expect(response.status).toBe(200)
    expect(body).toEqual({ images: mockGallery, hasMore: true })
  })

  it('returns 200 with hasMore false on the last page', async () => {
    const mockGallery = [{ id: '1', image: { url: 'test.jpg' } }]
    ;(getGallery as any).mockResolvedValue({
      gallery: mockGallery,
      hasNextPage: false,
      nextPage: null,
      totalDocs: 1,
    })

    const response = await GET(makeRequest('?page=1&limit=10'))
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ images: mockGallery, hasMore: false })
  })

  it('returns 200 with empty images and hasMore false when no gallery images exist', async () => {
    ;(getGallery as any).mockResolvedValue({
      gallery: [],
      hasNextPage: false,
      nextPage: null,
      totalDocs: 0,
    })

    const response = await GET(makeRequest('?page=1&limit=10'))
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ images: [], hasMore: false })
  })

  it('returns 400 when page param is missing', async () => {
    const response = await GET(makeRequest('?limit=10'))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toBeDefined()
    expect(getGallery).not.toHaveBeenCalled()
  })

  it('returns 400 when limit param is missing', async () => {
    const response = await GET(makeRequest('?page=1'))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toBeDefined()
    expect(getGallery).not.toHaveBeenCalled()
  })

  it('returns 400 when both page and limit are missing', async () => {
    const response = await GET(makeRequest(''))

    expect(response.status).toBe(400)
    expect(getGallery).not.toHaveBeenCalled()
  })

  it('returns 400 when page is non-numeric', async () => {
    const response = await GET(makeRequest('?page=abc&limit=10'))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toBeDefined()
    expect(getGallery).not.toHaveBeenCalled()
  })

  it('returns 400 when limit is non-numeric', async () => {
    const response = await GET(makeRequest('?page=1&limit=xyz'))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toBeDefined()
    expect(getGallery).not.toHaveBeenCalled()
  })
})
