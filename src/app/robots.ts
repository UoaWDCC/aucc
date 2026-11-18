import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search results
  const isPreview =
    process.env.VERCEL_ENV !== undefined &&
    process.env.VERCEL_ENV !== 'production'

  if (isPreview) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: new URL('/sitemap.xml', env.SERVER_URL).toString(),
  }
}
