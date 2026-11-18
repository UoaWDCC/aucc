import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { SiteSetting } from '@/payload-types'

export type SiteSettingsDTO = NoNumber<SiteSetting>

const EMPTY_SETTINGS: SiteSettingsDTO = {
  id: 0,
  contactEmail: null,
  contactNote: null,
  address: null,
  socials: [],
  footerLinks: [],
  defaultShareImage: null,
}

const getCachedSiteSettings = unstable_cache(
  async function () {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })
    return result as SiteSettingsDTO
  },
  ['getSiteSettings'],
  {
    tags: cacheTags.siteSettings.relatedTags,
  },
)

/**
 * Site-wide settings for the footer and About page. Cached, and refreshed
 * when an editor saves Site Settings.
 *
 * Falls back to empty settings so a database problem never breaks the
 * footer on every page. The fallback sits outside the cache so a failure
 * isn't cached.
 */
export async function getSiteSettings(): Promise<SiteSettingsDTO> {
  try {
    return await getCachedSiteSettings()
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return EMPTY_SETTINGS
  }
}
