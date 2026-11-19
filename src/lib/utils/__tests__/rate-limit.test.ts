import { describe, expect, it } from 'vitest'

import { clientIp, createRateLimiter } from '../rate-limit'

describe('createRateLimiter', () => {
  it('allows up to the limit within the window, then blocks', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 })

    expect(limiter.check('a', 0).allowed).toBe(true)
    expect(limiter.check('a', 100).allowed).toBe(true)
    expect(limiter.check('a', 200)).toEqual({
      allowed: false,
      retryAfterSeconds: 1,
    })
  })

  it('allows again once the oldest hit leaves the window', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })

    limiter.check('a', 0)
    expect(limiter.check('a', 999).allowed).toBe(false)
    expect(limiter.check('a', 1000).allowed).toBe(true)
  })

  it('tracks keys separately', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })

    limiter.check('a', 0)
    expect(limiter.check('b', 0).allowed).toBe(true)
  })

  it('never tracks more than maxKeys keys', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 })

    limiter.check('a', 0)
    limiter.check('b', 0)
    limiter.check('c', 0) // evicts 'a', the least recently used
    expect(limiter.check('a', 1).allowed).toBe(true)
  })

  it('forgets everything on reset', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })

    limiter.check('a', 0)
    limiter.reset()
    expect(limiter.check('a', 1).allowed).toBe(true)
  })
})

describe('clientIp', () => {
  it('uses the first x-forwarded-for address', () => {
    const headers = new Headers({ 'x-forwarded-for': '203.0.113.5, 10.0.0.1' })
    expect(clientIp(headers)).toBe('203.0.113.5')
  })

  it('falls back to x-real-ip, then unknown', () => {
    expect(clientIp(new Headers({ 'x-real-ip': '198.51.100.7' }))).toBe(
      '198.51.100.7',
    )
    expect(clientIp(new Headers())).toBe('unknown')
  })
})
