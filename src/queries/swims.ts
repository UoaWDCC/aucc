import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import type { Swim } from '@/payload-types'

export type SwimDTO = NoNumber<
  Pick<Swim, 'id' | 'date' | 'tripName' | 'river' | 'memberName' | 'image'>
>

export const getApprovedSwims = unstable_cache(
  async function ({
    page = 1,
    limit = 12,
    sort = '-date',
    withImage = false,
  }: {
    page?: number
    limit?: number
    sort?: string
    withImage?: boolean
  } = {}) {
    try {
      const payload = await getPayloadClient()

      const { docs, hasNextPage, nextPage, totalDocs } = await payload.find({
        collection: 'swims',
        page,
        limit,
        sort,
        depth: 1,
        where: {
          and: [
            { approvedToShare: { equals: true } },
            ...(withImage ? [{ image: { exists: true } }] : []),
          ],
        },
        select: {
          id: true,
          date: true,
          tripName: true,
          river: true,
          memberName: true,
          image: true,
        },
      })

      return {
        swims: docs as SwimDTO[],
        hasNextPage,
        nextPage,
        totalDocs,
      }
    } catch (error) {
      console.error('Error fetching approved swims:', error)
      return {
        swims: [] as SwimDTO[],
        hasNextPage: false,
        nextPage: null,
        totalDocs: 0,
      }
    }
  },
  ['getApprovedSwims'],
  { tags: cacheTags.swims.relatedTags },
)
