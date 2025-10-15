import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { ResourcesGlobal as ResourcesGlobalType } from '@/payload-types'

export type ResourcesGlobalDTO = NoNumber<ResourcesGlobalType>

export const getResourcesGlobal = unstable_cache(
  async function () {
    const payload = await getPayloadClient()

    const result = await payload.findGlobal({
      slug: 'resources-global',
    })

    return result as ResourcesGlobalDTO
  },
  ['getResourcesGlobal'],
  {
    tags: cacheTags.resourcesGlobal.relatedTags,
  },
)
