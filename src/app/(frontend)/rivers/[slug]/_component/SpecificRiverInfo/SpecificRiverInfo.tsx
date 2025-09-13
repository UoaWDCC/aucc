// app/(site)/rivers/[slug]/_component/SpecificRiverInfo/SpecificRiverInfo.tsx
import { RiverDTO } from '@/queries/rivers'
import { SpecificRiverInfoMap } from './SpecificRiverInfoMap'
import { SpecificRiverTripReports } from './SpecificRiverInfoReports'

export function SpecificRiverInfo({ river }: { river: RiverDTO }) {
  return (
    <div className="bg-water">
      <SpecificRiverInfoMap river={river} />
      <SpecificRiverTripReports river={river} />
    </div>
  )
}
