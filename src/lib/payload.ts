import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'

// Create a cached version of getPayloadClient to reuse the connection
export const getPayloadClient = cache(async () => {
  const payload = await getPayload({
    config,
  })
  return payload
})
