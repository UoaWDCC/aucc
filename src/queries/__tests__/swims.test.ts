/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { countRecentSwimsByEmail } from '@/queries/swims'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('next/cache', async () => ({
  unstable_cache: (fn: any) => fn,
}))

describe('countRecentSwimsByEmail', () => {
  const payload = { find: vi.fn() }
  const since = new Date('2026-11-20T00:00:00.000Z')

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(payload)
  })

  it('counts casing variants of the same email together', async () => {
    // What the case-insensitive database filter returns, mixed-case
    // records included
    payload.find.mockResolvedValue({
      docs: [
        { email: 'alex@example.com' },
        { email: 'alex@EXAMPLE.COM' },
        { email: 'Alex@Example.com' },
      ],
    })

    await expect(
      countRecentSwimsByEmail('ALEX@example.com', since),
    ).resolves.toBe(3)
    await expect(
      countRecentSwimsByEmail('alex@example.com', since),
    ).resolves.toBe(3)
  })

  it('does not count other addresses that merely contain the email', async () => {
    payload.find.mockResolvedValue({
      docs: [
        { email: 'alex@example.com' },
        { email: 'malex@example.com' },
        { email: 'alex@example.com.au' },
      ],
    })

    await expect(
      countRecentSwimsByEmail('Alex@Example.com', since),
    ).resolves.toBe(1)
  })

  it('filters case-insensitively by email and by creation time in the database', async () => {
    payload.find.mockResolvedValue({ docs: [] })

    await countRecentSwimsByEmail('  Alex@Example.COM ', since)

    expect(payload.find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'swims',
        where: {
          and: [
            // Payload's like is a case-insensitive ILIKE in Postgres
            { email: { like: 'alex@example.com' } },
            { createdAt: { greater_than: since.toISOString() } },
          ],
        },
        pagination: false,
        overrideAccess: true,
      }),
    )
  })

  it('returns 0 without querying for an empty email', async () => {
    await expect(countRecentSwimsByEmail('   ', since)).resolves.toBe(0)
    expect(payload.find).not.toHaveBeenCalled()
  })
})
