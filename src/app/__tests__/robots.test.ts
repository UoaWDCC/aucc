import { afterEach, describe, expect, it, vi } from 'vitest'

import robots from '../robots'

vi.mock('@/lib/env', () => ({
  env: { SERVER_URL: 'https://aucc.example' },
}))

describe('robots.txt', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('allows the public site, hides admin and API, and links the sitemap', () => {
    vi.stubEnv('VERCEL_ENV', 'production')

    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
      sitemap: 'https://aucc.example/sitemap.xml',
    })
  })

  it('blocks everything on Vercel preview deployments', () => {
    vi.stubEnv('VERCEL_ENV', 'preview')

    expect(robots()).toEqual({ rules: { userAgent: '*', disallow: '/' } })
  })
})
