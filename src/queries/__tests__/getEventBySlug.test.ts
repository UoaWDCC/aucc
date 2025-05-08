// tests/queries/getEventBySlug.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getEventBySlug } from '@/queries/events'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

describe('getEventBySlug', () => {
  const mockPayloadClient = {
    find: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  it('should return null if no event is found', async () => {
    mockPayloadClient.find.mockResolvedValue({ docs: [] })

    const result = await getEventBySlug('non-existent-event')

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'events',
      where: {
        slug: { equals: 'non-existent-event' },
      },
    })
    expect(result).toBeNull()
  })

  it('should return the event if found', async () => {
    const mockEvent = {
      id: '1',
      title: 'Sample Event',
      slug: 'sample-event',
    }

    mockPayloadClient.find.mockResolvedValue({ docs: [mockEvent] })

    const result = await getEventBySlug('sample-event')

    expect(mockPayloadClient.find).toHaveBeenCalledWith({
      collection: 'events',
      where: {
        slug: { equals: 'sample-event' },
      },
    })
    expect(result).toEqual(mockEvent)
  })

  it('should return null and log error if find throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockPayloadClient.find.mockRejectedValue(new Error('DB failure'))

    const result = await getEventBySlug('failing-slug')

    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch event:',
      expect.any(Error),
    )

    consoleSpy.mockRestore()
  })
})
