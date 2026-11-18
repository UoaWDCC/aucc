import { getApprovedSwims, type SwimDTO } from '@/queries/swims'
import { SwimsFormSection } from './form/SwimsFormSection'
import type { RiverOption } from './form/SwimsLogForm'
import { SwimsHeaderSection } from './header/SwimsHeaderSection'
import { SwimsList, type SwimRecordDTO } from './SwimsList'

interface SwimsPageProps {
  rivers: RiverOption[]
}

function toSwimRecord(swim: SwimDTO): SwimRecordDTO {
  const river = swim.river
  return {
    id: String(swim.id),
    date: swim.date,
    trip: swim.tripName,
    river: typeof river === 'object' && river !== null ? river.name : '',
    memberName: swim.memberName,
  }
}

export async function SwimsPage({ rivers }: SwimsPageProps) {
  // Only swims an admin has approved are public, because they show names.
  const [{ swims: approvedSwims }, { swims: approvedPhotos }] =
    await Promise.all([
      getApprovedSwims({ limit: 50 }),
      getApprovedSwims({ withImage: true }),
    ])

  return (
    <>
      <SwimsHeaderSection />
      <SwimsList swims={approvedSwims.map(toSwimRecord)} />
      <SwimsFormSection rivers={rivers} approvedPhotos={approvedPhotos} />
    </>
  )
}
