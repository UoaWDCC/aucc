import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { GalleryGlobal as GalleryGlobalType, Media } from '@/payload-types'

export type GalleryGlobalDTO = NoNumber<GalleryGlobalType>

export const getGalleryGlobal = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const result = await payload.findGlobal({
        slug: 'gallery-global',
      })

      return result as GalleryGlobalDTO
    } catch (error) {
      console.error('Error fetching gallery global data:', error)
      return {
        headerImage: null as Media | null,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      } as unknown as GalleryGlobalDTO
    }
  },
  ['getGalleryGlobal'],
  {
    tags: cacheTags.galleryGlobal.relatedTags,
  },
)
