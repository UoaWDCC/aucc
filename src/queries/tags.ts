import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { Tag } from '@/payload-types'

export type TagDTO = Pick<Tag, 'id' | 'name'>

export const getTags = unstable_cache(
  async function (): Promise<TagDTO[]> {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'tags',
      sort: 'name',
      limit: 100,
      select: { name: true },
    })

    return docs
  },
  ['getTags'],
  {
    tags: cacheTags.tags.relatedTags,
  },
)
