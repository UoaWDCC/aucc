import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'

export const getMerchGlobal = unstable_cache(async () => {
  const payload = await getPayloadClient()

  const merch = await payload.findGlobal({
    slug: 'merch',
  })

  return merch
}, ['merch-global'])
