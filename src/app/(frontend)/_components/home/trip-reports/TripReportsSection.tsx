import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getPlainText } from '@/lib/utils/get-plain-text'
import type { TripReport } from '@/payload-types'

const PLACEHOLDER = '/hero_background_Image.jpg'

interface TripReportsSectionProps {
  tripReports: TripReport[]
}

export function TripReportsSection({ tripReports }: TripReportsSectionProps) {
  const latestThree = tripReports.slice(0, 3)
  const reportA = latestThree[0]
  const reportB = latestThree[1]
  const reportC = latestThree[2]

  const formatDate = (isoDate: string) => {
    const d = new Date(isoDate)
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="h-auto min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="px-6 pt-8 pb-12 md:px-16 lg:px-72">
        <h2 className="mb-4 text-3xl font-[var(--font-heading)] text-white">
          LATEST REPORTS
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2">
          {/*** BIG CARD (reportA) ***/}
          {reportA && (
            <article className="col-span-2 flex flex-col rounded-2xl bg-[#0A0F0C]/90 p-4 sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <h3 className="mt-2 mb-1 text-2xl font-[var(--font-heading)] text-[#F0F0E5]">
                {reportA.title}
              </h3>
              <time className="mb-1 text-sm text-[#F0F0E5]/70 italic">
                {formatDate(reportA.tripDate)}
              </time>

              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={reportA.coverImage?.url ?? PLACEHOLDER}
                  alt={reportA.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="line-clamp-4 flex-grow text-base text-[#F0F0E5]/80">
                {(() => {
                  const raw = getPlainText(reportA.content as any)
                  return raw.length > 200 ? raw.slice(0, 200) + '…' : raw
                })()}
              </p>
            </article>
          )}

          {/*** SMALL CARD 1 (reportB) ***/}
          {reportB && (
            <article className="col-span-1 row-span-1 flex flex-col rounded-2xl bg-[#0A0F0C]/90 p-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={reportB.coverImage?.url ?? PLACEHOLDER}
                  alt={reportB.title}
                  fill
                  className="object-cover"
                />
              </div>

              <time className="mt-2 block text-xs text-[#F0F0E5]/70 italic">
                {formatDate(reportB.tripDate)}
              </time>

              <h4 className="mt-1 text-lg font-[var(--font-heading)] text-[#F0F0E5]">
                {reportB.title}
              </h4>
            </article>
          )}

          {/*** SMALL CARD 2 (reportC) ***/}
          {reportC && (
            <article className="col-span-1 row-span-1 flex flex-col justify-end rounded-2xl bg-[#0A0F0C]/90 p-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={reportC.coverImage?.url ?? PLACEHOLDER}
                  alt={reportC.title}
                  fill
                  className="object-cover"
                />
              </div>

              <time className="text-xs text-[#F0F0E5]/70 italic">
                {formatDate(reportC.tripDate)}
              </time>

              <h4 className="mt-1 text-lg font-[var(--font-heading)] text-[#F0F0E5]">
                {reportC.title}
              </h4>
            </article>
          )}
        </div>

        {/* put the see more report button here */}
      </section>
    </div>
  )
}
