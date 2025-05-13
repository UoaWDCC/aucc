import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getEventById } from '@/queries/events'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

describe('getEventById', () => {
  const mockPayloadClient = {
    findByID: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  it('should return null if event is not found', async () => {
    mockPayloadClient.findByID.mockRejectedValue(new Error('Not found'))

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
