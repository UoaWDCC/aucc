'use client'

import React from 'react'
import Image from 'next/image'

import { formatDate } from '@/lib/utils/formatDate'
import { getPlainText } from '@/lib/utils/get-plain-text'
import type { TripReportDTO } from '@/queries/trip-reports'
import { LatestReportsHeader } from './LRHeader'
import { SARButton } from './SARButton'

const PLACEHOLDER = '/hero_background_Image.jpg'

interface TripReportsSectionProps {
  latestReports: TripReportDTO[]
}

export function TripReportsSection({ latestReports }: TripReportsSectionProps) {
  const tripReports = latestReports.map((report) => ({
    title: report.title,
    tripDate: report.tripDate ?? '',
    coverImageURL: report.coverImage?.url ?? PLACEHOLDER,
    content: getPlainText(report.content),
  }))

  const latestThree = tripReports.slice(0, 3)
  const reportA = latestThree[0]
  const reportB = latestThree[1]
  const reportC = latestThree[2]

  return (
    <div className="h-188 min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="px-4 pt-20 pb-12 md:px-16 lg:px-72">
        <LatestReportsHeader />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2">
          {/*** BIG CARD (reportA) ***/}
          {reportA && (
            <article className="col-span-2 flex h-70 flex-col rounded-2xl bg-[#0A0F0C]/90 p-4 sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <h3 className="text-cream font-(heading: --Rubik-Mono-One) mt-2 mb-1 text-2xl font-extrabold">
                {reportA.title}
              </h3>
              <time className="text-cream mb-4 text-sm italic">
                {formatDate(reportA.tripDate)}
              </time>

              <div className="grid grid-cols-2 items-start gap-4">
                <div className="relative mb-4 aspect-[4/3] w-full gap-4 overflow-hidden rounded-lg">
                  <Image
                    src={reportA.coverImageURL ?? PLACEHOLDER}
                    alt={reportA.title}
                    fill
                    className="h-37.5 w-32.5 object-cover"
                  />
                </div>
                <p className="font-(body: --Rubik) line-clamp-4 flex-grow text-sm leading-5.5 text-gray-300 italic">
                  {(() => {
                    const raw = getPlainText(reportA.content as any)
                    return raw.length > 200 ? raw.slice(0, 200) + '…' : raw
                  })()}
                </p>
              </div>
            </article>
          )}

          {/*** SMALL CARD 1 (reportB) ***/}
          {reportB && (
            <article className="col-span-1 row-span-1 flex flex-col rounded-2xl">
              <div className="relative aspect-[16/9] h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={reportB.coverImageURL ?? PLACEHOLDER}
                  alt={reportB.title ?? 'Trip cover image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="text-cream absolute bottom-2 left-3 z-10">
                  <time className="text-xs italic">
                    {formatDate(reportB.tripDate)}
                  </time>

                  <h4 className="font-(heading: --Rubik-Mono-One) text-xl font-extrabold">
                    {reportB.title}
                  </h4>
                </div>
              </div>
            </article>
          )}

          <div>
            {/*** SMALL CARD 2 (reportC) ***/}
            {reportC && (
              <article className="col-span-1 row-span-1 flex flex-col rounded-2xl">
                <div className="relative aspect-[16/9] h-31.5 w-full overflow-hidden rounded-lg">
                  <Image
                    src={reportC.coverImageURL ?? PLACEHOLDER}
                    alt={reportC.title ?? 'Trip cover image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="text-cream absolute bottom-2 left-2 z-10">
                    <time className="text-xs italic">
                      {formatDate(reportC.tripDate)}
                    </time>

                    <h4 className="font-(heading: --Rubik-Mono-One) text-xl font-extrabold">
                      {reportC.title}
                    </h4>
                  </div>
                </div>
              </article>
            )}

            {/* put the see more report button here */}
            <SARButton />
          </div>
        </div>
      </section>
    </div>
  )
}
