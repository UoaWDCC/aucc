import React from 'react'

import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReports } from '@/queries/trip-reports'
import { LatestReportsHeader } from './LatestReportsHeader'
import {
  DesktopTabletPrimaryTripReportCard,
  PrimaryTripReportCard,
} from './report-cards.tsx/PrimaryTripReportCard'
import { SecondaryTripReportCard } from './report-cards.tsx/SecondaryTripReportCard'
import { TertiaryTripreportCard } from './report-cards.tsx/TertiaryTripReportCard'
import { SARButton } from './SARButton'

const PLACEHOLDER = '/hero_background_Image.jpg'
export async function TripReportsSection() {
  const { tripReports } = await getTripReports({
    page: 1,
    limit: 3,
    sort: '-tripDate',
  })

  const [reportA, reportB, reportC] = tripReports.map((report) => ({
    title: report.title,
    tripDate: report.tripDate ?? '',
    coverImageURL: report.coverImage?.url ?? PLACEHOLDER,
    content: getPlainText(report.content),
  }))

  const hasThreeReports = tripReports.length >= 3
  const hasTwoReports = tripReports.length === 2

  return (
    <div className="h-188 min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="px-4 pt-20 pb-12 md:mx-30 md:p-5 md:pt-35 lg:mx-35 lg:p-5 lg:pt-38">
        <LatestReportsHeader />

        {/* Mobile View */}
        <div className="block items-center justify-center md:hidden">
          {hasThreeReports ? (
            <div className="grid grid-rows-2 gap-4">
              <PrimaryTripReportCard report={reportA} />
              <div className="grid grid-cols-2 gap-4">
                <SecondaryTripReportCard report={reportB} />
                <div>
                  <TertiaryTripreportCard report={reportC} />
                  <SARButton />
                </div>
              </div>
            </div>
          ) : hasTwoReports ? (
            <div className="grid grid-rows-2 gap-4">
              <PrimaryTripReportCard report={reportA} />
              <SecondaryTripReportCard report={reportB} />
              <SARButton />
            </div>
          ) : (
            <div className="grid grid-rows-1 gap-4">
              <PrimaryTripReportCard report={reportA} />
              <SARButton />
            </div>
          )}
        </div>

        {/* Desktop & Tablet View */}
        <div className="hidden justify-center md:block">
          {hasThreeReports ? (
            <>
              <div className="flex justify-center">
                <div className="flex w-[58%] pr-3.25">
                  <PrimaryTripReportCard report={reportA} />
                </div>
                <div className="flex w-[42%] flex-col gap-2.25">
                  <SecondaryTripReportCard report={reportB} />
                  <TertiaryTripreportCard report={reportC} />
                </div>
              </div>
            </>
          ) : hasTwoReports ? (
            <>
              <div className="flex justify-center">
                <div className="flex w-[58%] pr-3.25">
                  <DesktopTabletPrimaryTripReportCard report={reportA} />
                </div>
                <div className="flex h-full w-[42%] flex-col">
                  <SecondaryTripReportCard report={reportB} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="flex w-full">
                  <DesktopTabletPrimaryTripReportCard report={reportA} />
                </div>
              </div>
            </>
          )}
          <SARButton />
        </div>
      </section>
    </div>
  )
}
