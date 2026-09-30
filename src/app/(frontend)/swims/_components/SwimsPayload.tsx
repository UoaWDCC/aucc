import { getPayloadClient } from '@/lib/payload'
import type { River, Swim } from '@/payload-types'
import type { SwimRecordDTO } from './SwimsList'

export async function SwimsPayload(): Promise<SwimRecordDTO[]> {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'swims',
      sort: '-date',
      depth: 1,
    })

    const swimRecords: SwimRecordDTO[] = (docs as Swim[]).map((swim) => {
      const river = swim.river
      const riverName =
        typeof river === 'object' ? (river as River).name : String(river)

      return {
        id: String(swim.id),
        date: swim.date,
        trip: swim.tripName,
        river: riverName,
        memberName: swim.memberName,
      }
    })

    return swimRecords
  } catch (error) {
    console.error('Error fetching swims from Payload:', error)
    return []
  }
}
