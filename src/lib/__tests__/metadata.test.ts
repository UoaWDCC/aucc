import { describe, expect, it } from 'vitest'

import {
  DEFAULT_SHARE_IMAGE,
  mediaUrl,
  pageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  truncateDescription,
} from '@/lib/metadata'

describe('truncateDescription', () => {
  it('collapses whitespace', () => {
    expect(truncateDescription('  River\n\n trips   and  pool ')).toBe(
      'River trips and pool',
    )
  })

  it('cuts long text to 160 characters with an ellipsis', () => {
    const result = truncateDescription('word '.repeat(60))
    expect(result.length).toBeLessThanOrEqual(160)
    expect(result.endsWith('…')).toBe(true)
  })

  it('handles missing text', () => {
    expect(truncateDescription(null)).toBe('')
  })
})

describe('mediaUrl', () => {
  it('reads the url of a populated upload', () => {
    expect(mediaUrl({ id: 1, url: 'https://cdn.example/a.jpg' })).toBe(
      'https://cdn.example/a.jpg',
    )
  })

  it('ignores an unpopulated id or empty value', () => {
    expect(mediaUrl(5)).toBeUndefined()
    expect(mediaUrl(null)).toBeUndefined()
  })
})

describe('pageMetadata', () => {
  it('builds title, canonical URL and share cards for a page', () => {
    const meta = pageMetadata({
      title: 'Events',
      description: 'Upcoming trips',
      path: '/events',
      image: 'https://cdn.example/events.jpg',
    })

    expect(meta.title).toBe('Events')
    expect(meta.description).toBe('Upcoming trips')
    expect(meta.alternates).toEqual({ canonical: '/events' })
    expect(meta.openGraph).toMatchObject({
      url: '/events',
      title: 'Events | AUCC',
      siteName: SITE_NAME,
      images: [{ url: 'https://cdn.example/events.jpg' }],
    })
    expect(meta.twitter).toMatchObject({
      card: 'summary_large_image',
      images: ['https://cdn.example/events.jpg'],
    })
  })

  it('falls back to the editor image, then the built-in image', () => {
    const withFallback = pageMetadata({
      path: '/x',
      fallbackImage: 'https://cdn.example/share.jpg',
    })
    expect(withFallback.openGraph?.images).toEqual([
      { url: 'https://cdn.example/share.jpg' },
    ])

    const builtIn = pageMetadata({ path: '/x' })
    expect(builtIn.openGraph?.images).toEqual([{ url: DEFAULT_SHARE_IMAGE }])
  })

  it('uses the site description when the page has none', () => {
    expect(pageMetadata({ path: '/x', description: '  ' }).description).toBe(
      SITE_DESCRIPTION,
    )
  })

  it('sets no canonical URL without a path, for layout defaults', () => {
    const meta = pageMetadata({})
    expect(meta.alternates).toBeUndefined()
    expect(meta.openGraph).not.toHaveProperty('url')
    expect(meta.title).toBeUndefined()
  })

  it('marks articles with their publish date', () => {
    const meta = pageMetadata({
      path: '/trip-reports/kaituna',
      type: 'article',
      publishedTime: '2026-11-01T00:00:00.000Z',
    })
    expect(meta.openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2026-11-01T00:00:00.000Z',
    })
  })
})
