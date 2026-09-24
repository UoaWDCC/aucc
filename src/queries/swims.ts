import { getPayloadClient } from '@/lib/payload'
import { Swim } from '@/payload-types'

export interface CreateSwimInput {
  memberName: string
  date: string
  tripName: string
  river: number
  email: string
  image?: number
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
