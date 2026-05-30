import { getPayloadClient } from '@/lib/payload'

export async function getMerchGlobal() {
  const payload = await getPayloadClient()

  const merch = await payload.findGlobal({
    slug: 'merch',
  })

  return merch
}
