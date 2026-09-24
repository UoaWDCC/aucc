import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { Tag } from '@/payload-types'

export type TagDTO = NoNumber<Tag>

export const getTags = unstable_cache(
  async function () {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'tags',
        limit: 0,
        sort: 'name',
        select: { name: true },
      })

      return docs as TagDTO[]
    } catch (error) {
      console.error('error fetching tags', error)
      return []
    }
  },
  ['getTags'],
  {
    tags: cacheTags.tags.relatedTags,
  },
)
