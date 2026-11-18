import type { Metadata } from 'next'

import { mediaUrl, pageMetadata } from '@/lib/metadata'
import { getSiteSettings } from '@/queries/site-settings'

/**
 * `pageMetadata` with the editor-chosen default share image from Site
 * Settings as the fallback. Use from a page's `generateMetadata`.
 */
export async function buildPageMetadata(
  input: Omit<Parameters<typeof pageMetadata>[0], 'fallbackImage'>,
): Promise<Metadata> {
  const { defaultShareImage } = await getSiteSettings()
  return pageMetadata({ ...input, fallbackImage: mediaUrl(defaultShareImage) })
}

/**
 * A page global's header image URL, for use as that page's share image.
 * Never throws: a missing image just means the default share image is used.
 */
export async function headerImageOf(
  load: () => Promise<{ headerImage?: unknown }>,
): Promise<string | undefined> {
  try {
    return mediaUrl((await load()).headerImage)
  } catch {
    return undefined
  }
}
