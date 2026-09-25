import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import type { Media } from '@/payload-types'

export type ApprovedSwimPhotoDTO = {
  id: string
  image: Media
}

export const getApprovedSwimPhotos = unstable_cache(
  async function (): Promise<ApprovedSwimPhotoDTO[]> {
    try {
      const payload = await getPayloadClient()

      const { docs } = await payload.find({
        collection: 'swims',
        where: {
          approvedToShare: {
            equals: true,
          },
        },
      })

      return docs
        .filter(
          (doc): doc is typeof doc & { image: Media } =>
            typeof doc.image === 'object' && doc.image !== null,
        )
        .map((doc) => ({
          id: String(doc.id),
          image: doc.image,
        }))
    } catch (error) {
      console.error('Error fetching approved swim photos:', error)
      return []
    }
  },
  ['getApprovedSwimPhotos'],
  { tags: cacheTags.swims?.relatedTags ?? [] },
)
