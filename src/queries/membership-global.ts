import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { NoNumber } from '@/lib/utils/util-types'
import type { MembershipGlobal as MembershipGlobalType } from '@/payload-types'

export type MembershipGlobalDTO = NoNumber<MembershipGlobalType>

/**
 * Cached so the /membership page is static, and tagged so editing the
 * global (or its header image) refreshes it without a redeploy.
 */
export const getMembershipGlobal = unstable_cache(
  async function () {
    const payload = await getPayloadClient()

    const result = await payload.findGlobal({
      slug: 'membership-global',
      depth: 1,
    })

    return result as MembershipGlobalDTO
  },
  ['getMembershipGlobal'],
  {
    tags: cacheTags.membershipGlobal.relatedTags,
  },
)
