import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { emailKeyDomains, emailRateLimitKey } from '@/lib/utils/email-key'
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

export interface CreateSwimInput {
  memberName: string
  date: string
  tripName: string
  river: number
  email: string
  image?: number
}

export interface SwimPhotoUpload {
  data: Buffer
  mimetype: string
  name: string
  size: number
}

/** Stores a submitted photo in the media collection (S3) and returns its id. */
export async function createSwimPhoto(
  file: SwimPhotoUpload,
  alt: string,
): Promise<number> {
  const payload = await getPayloadClient()
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file,
  })
  return media.id
}

/** Removes a photo whose swim could not be saved, so no orphan is left. */
export async function deleteSwimPhoto(id: number): Promise<void> {
  const payload = await getPayloadClient()
  await payload.delete({ collection: 'media', id })
}

/**
 * Number of swims submitted to the same mailbox as `email` since `since`.
 * Addresses are compared by `emailRateLimitKey`, so casing, plus tags and
 * Gmail dots don't give the same inbox a fresh allowance. Stored records keep
 * the address as typed, so they're compared the same way.
 *
 * The database narrows to recent swims on the same domain (Payload's `like`
 * is a case-insensitive substring match, ILIKE '%value%'), and the exact key
 * comparison happens here. A club gets few swims an hour, so this stays small.
 */
export async function countRecentSwimsByEmail(
  email: string,
  since: Date,
): Promise<number> {
  const key = emailRateLimitKey(email)
  if (!key) return 0

  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'swims',
    where: {
      and: [
        {
          or: emailKeyDomains(key).map((domain) => ({
            email: { like: `@${domain}` },
          })),
        },
        { createdAt: { greater_than: since.toISOString() } },
      ],
    },
    select: { email: true },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  return docs.filter((doc) => emailRateLimitKey(doc.email ?? '') === key).length
}

export async function createSwim(input: CreateSwimInput): Promise<Swim> {
  const payload = await getPayloadClient()

  return payload.create({
    collection: 'swims',
    data: {
      memberName: input.memberName,
      date: input.date,
      tripName: input.tripName,
      river: input.river,
      email: input.email,
      ...(input.image !== undefined ? { image: input.image } : {}),
    },
  })
}
