import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

export const SITE_NAME = 'Auckland University Canoe Club'
export const SITE_SHORT_NAME = 'AUCC'
export const SITE_DESCRIPTION =
  'The Auckland University Canoe Club: whitewater kayaking trips, pool training and a welcoming paddling community for students and friends of the University of Auckland.'

/** Static fallback share image in /public, used when no other image is set. */
export const DEFAULT_SHARE_IMAGE = '/og-default.png'

const DESCRIPTION_LENGTH = 160

export function truncateDescription(text: string | null | undefined) {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= DESCRIPTION_LENGTH) return clean
  return `${clean.slice(0, DESCRIPTION_LENGTH - 1).trimEnd()}…`
}

/** The public URL of an uploaded image, if the relation is populated. */
export function mediaUrl(media: unknown): string | undefined {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as Pick<Media, 'url'>).url ?? undefined
  }
  return undefined
}

type PageMetadataInput = {
  /** Page title; the layout adds " | AUCC". */
  title?: string
  description?: string | null
  /**
   * Path of the page, e.g. /events, used as its canonical URL. Leave it out
   * for layout-level defaults, or every page would claim the same URL.
   */
  path?: string
  /** Absolute URL or site path of the share image. */
  image?: string
  /** Used when `image` is missing, e.g. the Site Settings share image. */
  fallbackImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
}

/**
 * Metadata for a page, including Open Graph and Twitter cards.
 *
 * Next replaces (rather than merges) a parent's `openGraph` when a page sets
 * its own, so every page builds the full object here, including the
 * fallback share image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  fallbackImage,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  const desc = truncateDescription(description) || SITE_DESCRIPTION
  const shareImage = image ?? fallbackImage ?? DEFAULT_SHARE_IMAGE
  const shareTitle = title ? `${title} | ${SITE_SHORT_NAME}` : SITE_NAME

  return {
    ...(title ? { title } : {}),
    description: desc,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_NZ',
      ...(path ? { url: path } : {}),
      title: shareTitle,
      description: desc,
      images: [{ url: shareImage }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: desc,
      images: [shareImage],
    },
  }
}
