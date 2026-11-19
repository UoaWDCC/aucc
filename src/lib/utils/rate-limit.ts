export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }

export interface RateLimiter {
  check(key: string, now?: number): RateLimitResult
  reset(): void
}

/**
 * Sliding-window rate limiter kept in memory.
 *
 * On Vercel each serverless instance has its own memory, so this limits
 * bursts that hit one instance rather than giving a global guarantee. Pair it
 * with a check backed by the database where that matters.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5000,
}: {
  limit: number
  windowMs: number
  /** Upper bound on tracked keys, so memory can't grow without limit */
  maxKeys?: number
}): RateLimiter {
  const hits = new Map<string, number[]>()

  const prune = (now: number) => {
    for (const [key, times] of hits) {
      const recent = times.filter((time) => now - time < windowMs)
      if (recent.length === 0) hits.delete(key)
      else hits.set(key, recent)
    }
  }

  return {
    check(key, now = Date.now()) {
      if (!hits.has(key) && hits.size >= maxKeys) {
        prune(now)
        // Still full: drop the oldest key rather than refuse everyone
        if (hits.size >= maxKeys) {
          const oldest = hits.keys().next().value
          if (oldest !== undefined) hits.delete(oldest)
        }
      }

      const recent = (hits.get(key) ?? []).filter(
        (time) => now - time < windowMs,
      )

      if (recent.length >= limit) {
        hits.set(key, recent)
        const retryAfterMs = windowMs - (now - recent[0])
        return {
          allowed: false,
          retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
        }
      }

      recent.push(now)
      // Re-insert so Map order tracks the most recently used keys
      hits.delete(key)
      hits.set(key, recent)
      return { allowed: true }
    },
    reset() {
      hits.clear()
    },
  }
}

/**
 * The client's IP address. Vercel sets x-forwarded-for with the real client
 * first; x-real-ip is a fallback for other proxies.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || headers.get('x-real-ip')?.trim() || 'unknown'
}
