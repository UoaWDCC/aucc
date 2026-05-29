import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { VideoHighlight } from '@/payload-types'

export type VideoHighlightDTO = NoNumber<VideoHighlight>

export const getVideoHighlights = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()

      const { docs } = await payload.find({
        collection: 'video-highlights',
        limit: 3,
        sort: '-createdAt',
      })

      return docs as VideoHighlightDTO[]
    } catch (error) {
      console.error('Error fetching video highlights:', error)
      return []
    }
  },
  ['getVideoHighlights'],
  {
    tags: cacheTags.videoHighlights.relatedTags,
  },
)
