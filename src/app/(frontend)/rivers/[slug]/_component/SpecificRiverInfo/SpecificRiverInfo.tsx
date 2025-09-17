// app/(site)/rivers/[slug]/_component/SpecificRiverInfo/SpecificRiverInfo.tsx
import { RiverDTO } from '@/queries/rivers'
import { SeeAllButton } from './SpecificRiverButton'
import { SpecificRiverInfoBackground } from './SpecificRiverInfoBackground'
import { SpecificRiverInfoMap } from './SpecificRiverInfoMap'
import { SpecificRiverTripReports } from './SpecificRiverInfoReports'

export function SpecificRiverInfo({ river }: { river: RiverDTO }) {
  return (
    <section className="relative isolate -mx-[calc(50vw-50%)] overflow-hidden">
      <SpecificRiverInfoBackground />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <SpecificRiverInfoMap river={river} />
          <SpecificRiverTripReports river={river} />
          <SeeAllButton />
        </div>
      </div>
    </section>
  )
}
