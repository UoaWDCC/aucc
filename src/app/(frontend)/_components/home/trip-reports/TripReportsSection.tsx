import React from 'react'

import { LatestReportsHeader } from './LatestReportsHeader'
import {
  MainReportCard,
  MainReportCardHover,
  SmallReportCard1,
  SmallReportCard2,
} from './ReportCards'
import { SARButton } from './SARButton'

export function TripReportsSection() {
  return (
    <div className="h-188 min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="px-4 pt-20 pb-12 md:mx-30 md:p-5 md:pt-35 lg:mx-35 lg:p-5 lg:pt-38">
        <div className="block md:hidden">
          <PhoneLayout />
        </div>

        <div className="hidden md:block">
          <DesktopTabletLayout />
        </div>
      </section>
    </div>
  )
}

function PhoneLayout() {
  return (
    <div className="flex flex-col items-center justify-center">
      <LatestReportsHeader />
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <MainReportCard />
        <SmallReportCard1 />
        <div>
          <SmallReportCard2 />
          <SARButton />
        </div>
      </div>
    </div>
  )
}

function DesktopTabletLayout() {
  return (
    <div className="justify-start">
      <LatestReportsHeader />
      <div className="flex justify-center">
        <div className="flex w-[58%] pr-3.25">
          <MainReportCard />
        </div>
        <div className="flex w-[42%] flex-col gap-2.25">
          <SmallReportCard1 />
          <SmallReportCard2 />
        </div>
      </div>
      <SARButton />
    </div>
  )
}
