/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { getSiteSettings } from '@/queries/site-settings'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('next/cache', async () => ({
  unstable_cache: (fn: any) => fn,
}))

vi.mock('@/lib/utils/revalidation', () => ({
  cacheTags: {
    siteSettings: { relatedTags: ['siteSettings', 'media'] },
  },
}))

describe('getSiteSettings', () => {
  const payload = { findGlobal: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(payload)
  })

  it('returns the site settings global', async () => {
    const settings = {
      id: 1,
      contactEmail: 'hello@example.com',
      socials: [{ platform: 'instagram', handle: 'aucc', url: 'https://x' }],
      footerLinks: [{ label: 'Events', href: '/events' }],
    }
    payload.findGlobal.mockResolvedValue(settings)

    await expect(getSiteSettings()).resolves.toEqual(settings)
    expect(payload.findGlobal).toHaveBeenCalledWith({
      slug: 'site-settings',
      depth: 1,
    })
  })

  it('falls back to empty settings so the footer still renders', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    payload.findGlobal.mockRejectedValue(new Error('db down'))

    const settings = await getSiteSettings()

    expect(settings.contactEmail).toBeNull()
    expect(settings.socials).toEqual([])
    expect(settings.footerLinks).toEqual([])
    consoleError.mockRestore()
  })
})
