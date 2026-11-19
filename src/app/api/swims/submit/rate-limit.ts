import { createRateLimiter } from '@/lib/utils/rate-limit'

/** Submissions allowed per IP address in IP_WINDOW_MS (in memory, per instance) */
export const IP_LIMIT = 10
export const IP_WINDOW_MS = 10 * 60 * 1000

/** Swims allowed per email address in EMAIL_WINDOW_MS (counted in the database) */
export const EMAIL_LIMIT = 10
export const EMAIL_WINDOW_MS = 60 * 60 * 1000

// Lives outside route.ts because a Next.js route file may only export
// route handlers and config.
export const swimSubmitIpLimiter = createRateLimiter({
  limit: IP_LIMIT,
  windowMs: IP_WINDOW_MS,
})

export const TOO_MANY_SUBMISSIONS =
  'Too many submissions. Please try again later.'
