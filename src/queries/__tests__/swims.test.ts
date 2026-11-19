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

  it('counts plus-tagged variants of the same mailbox together', async () => {
    payload.find.mockResolvedValue({
      docs: [
        { email: 'johndoe@outlook.com' },
        { email: 'johndoe+marketing@outlook.com' },
        { email: 'JohnDoe+swims@Outlook.com' },
        // Dots matter outside Gmail: a different person
        { email: 'john.doe@outlook.com' },
      ],
    })

    await expect(
      countRecentSwimsByEmail('johndoe+other@outlook.com', since),
    ).resolves.toBe(3)
  })

  it('counts Gmail dot, plus and googlemail variants together', async () => {
    payload.find.mockResolvedValue({
      docs: [
        { email: 'john.doe@gmail.com' },
        { email: 'johndoe@gmail.com' },
        { email: 'j.o.h.n.doe+marketing@gmail.com' },
        { email: 'JohnDoe@googlemail.com' },
        { email: 'janedoe@gmail.com' },
      ],
    })

    await expect(
      countRecentSwimsByEmail('johndoe@gmail.com', since),
    ).resolves.toBe(4)
  })

  it('narrows by domain and creation time in the database', async () => {
    payload.find.mockResolvedValue({ docs: [] })

    await countRecentSwimsByEmail('  Alex+x@Example.COM ', since)

    expect(payload.find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'swims',
        where: {
          and: [
            // Payload's like is a case-insensitive ILIKE in Postgres
            { or: [{ email: { like: '@example.com' } }] },
            { createdAt: { greater_than: since.toISOString() } },
          ],
        },
        pagination: false,
        overrideAccess: true,
      }),
    )
  })

  it('searches both Gmail domains for a Gmail address', async () => {
    payload.find.mockResolvedValue({ docs: [] })

    await countRecentSwimsByEmail('john.doe@googlemail.com', since)

    expect(payload.find.mock.calls[0][0].where.and[0]).toEqual({
      or: [
        { email: { like: '@gmail.com' } },
        { email: { like: '@googlemail.com' } },
      ],
    })
  })

  it('returns 0 without querying for something that is not an email', async () => {
    await expect(countRecentSwimsByEmail('   ', since)).resolves.toBe(0)
    await expect(countRecentSwimsByEmail('no-at-sign', since)).resolves.toBe(0)
    expect(payload.find).not.toHaveBeenCalled()
  })
})
