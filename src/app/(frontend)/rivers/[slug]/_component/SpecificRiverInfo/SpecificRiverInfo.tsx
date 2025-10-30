// app/(site)/rivers/[slug]/_component/SpecificRiverInfo/SpecificRiverInfo.tsx
import { RiverDTO } from '@/queries/rivers'
import { SeeAllButton } from './SpecificRiverButton'
import { SpecificRiverInfoBackground } from './SpecificRiverInfoBackground'
import { SpecificRiverInfoMap } from './SpecificRiverInfoMap'
import { SpecificRiverTripReports } from './SpecificRiverInfoReports'
import { SpecificRiverInfoReportsTitle } from './SpecificRiverInfoReportsTitle'

export function SpecificRiverInfo({ river }: { river: RiverDTO }) {
  return (
    <div>
      <section className="relative isolate">
        <SpecificRiverInfoBackground />
        <div className="relative z-2 w-full">
          <div className="flex items-center justify-start">
            <SpecificRiverInfoMap river={river} />
          </div>
          <div className="flex items-center justify-center md:justify-end md:pr-24">
            <div className="flex flex-col items-end">
              <SpecificRiverTripReports river={river} />
              <SeeAllButton />
            </div>
            <div className="flex w-24 justify-center">
              <SpecificRiverInfoReportsTitle />
            </div>
          </div>
        </div>
      </section>
      <div className="h-[240px] w-full bg-[#7F9F66]" />
    </div>
  )
}
