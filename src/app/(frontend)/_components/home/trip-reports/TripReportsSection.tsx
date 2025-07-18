import React from 'react'

import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReports } from '@/queries/trip-reports'
import { LatestReportsHeader } from './LatestReportsHeader'
import { PrimaryTripReportCard } from './report-cards.tsx/PrimaryTripReportCard'
import { SecondaryTripReportCard } from './report-cards.tsx/SecondaryTripReportCard'
import { TertiaryTripReportCard } from './report-cards.tsx/TertiaryTripReportCard'
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

  return (
    <div className="h-188 min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="px-4 pt-20 pb-12 md:mx-30 md:p-5 md:pt-35 lg:mx-35 lg:p-5 lg:pt-38">
        <LatestReportsHeader />
        <div className="flex flex-col gap-4 md:flex-row md:justify-center md:gap-3">
          <div className="w-full md:w-[58%]">
            <PrimaryTripReportCard report={reportA} />
          </div>
          <div className="flex flex-col gap-4 md:w-[42%] md:gap-2.25">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-2.25">
              <SecondaryTripReportCard report={reportB} />
              <div className="flex flex-col">
                <TertiaryTripReportCard report={reportC} />
                <div className="md:hidden">
                  <SARButton />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <SARButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
