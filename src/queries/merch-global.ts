import { getPayloadClient } from '@/lib/payload'

export async function getMerchGlobal() {
  try {
    const payload = await getPayloadClient()

    const merch = await payload.findGlobal({
      slug: 'merch',
    })

    return merch
  } catch (error) {
    console.error('Error fetching merch global data:', error)
    return {
      sections: [],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
  }
}
