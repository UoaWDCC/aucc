import React from 'react'

import PLACEHOLDER from '@/assets/hero.webp'
import { formatDate } from '@/lib/utils/formatDate'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReports } from '@/queries/trip-reports'
import { LatestReportsHeader } from './LatestReportsHeader'
import { PrimaryTripReportCard } from './report-cards.tsx/PrimaryTripReportCard'
import { SecondaryTripReportCard } from './report-cards.tsx/SecondaryTripReportCard'
import { TertiaryTripReportCard } from './report-cards.tsx/TertiaryTripReportCard'
import { SeeAllReportsButton } from './SeeAllReportsButton'

export async function TripReportsSection() {
  const { tripReports } = await getTripReports({
    page: 1,
    limit: 3,
    sort: '-tripDate',
  })

  const defaultReport = {
    title: 'No report available',
    tripDate: undefined,
    featuredImageURL: PLACEHOLDER.src,
    content: 'No content available',
  }

  const mappedReports =
    tripReports?.slice(0, 3).map((report) => ({
      title: report.title || 'No report available',
      tripDate: report.tripDate || '',
      featuredImageURL: report.featuredImage?.url || PLACEHOLDER.src,
      content: report.content
        ? getPlainText(report.content)
        : 'No content available',
    })) || []

  const [reportA, reportB, reportC] = [
    mappedReports[0] || defaultReport,
    mappedReports[1] || defaultReport,
    mappedReports[2] || defaultReport,
  ]

  return (
    <div className="h-188 min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="mx-4 pt-20 pb-12 md:mx-20 lg:mx-28 lg:pt-35">
        <LatestReportsHeader />
        <div className="flex flex-col gap-4 md:flex-row md:justify-center">
          <div className="w-full md:w-[58%]">
            <PrimaryTripReportCard
              title={reportA.title}
              tripDate={
                reportA.tripDate
                  ? formatDate(reportA.tripDate)
                  : 'No date available'
              }
              featuredImageURL={reportA.featuredImageURL}
              content={reportA.content}
            />
          </div>
          <div className="flex flex-col gap-4 md:w-[42%] md:gap-2.25">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-2.25">
              <SecondaryTripReportCard
                title={reportB.title}
                tripDate={
                  reportB.tripDate
                    ? formatDate(reportB.tripDate)
                    : 'No date available'
                }
                featuredImageURL={reportB.featuredImageURL}
                content={reportB.content}
              />
              <div className="flex flex-col">
                <TertiaryTripReportCard
                  title={reportC.title}
                  tripDate={
                    reportC.tripDate
                      ? formatDate(reportC.tripDate)
                      : 'No date available'
                  }
                  featuredImageURL={reportC.featuredImageURL}
                  content={reportC.content}
                />
                <div className="md:hidden">
                  <SeeAllReportsButton />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <SeeAllReportsButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
