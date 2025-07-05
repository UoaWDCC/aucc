import React from 'react'
import Image from 'next/image'

import { formatDate } from '@/lib/utils/formatDate'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReports, type TripReportDTO } from '@/queries/trip-reports'
import { LatestReportsHeader } from './LatestReportsHeader'
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
      <section className="px-4 pt-20 pb-12 md:px-16 lg:px-72">
        <LatestReportsHeader />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2">
          {/*** BIG CARD (reportA) ***/}
          {reportA && (
            <article className="to-abyss col-span-2 flex flex-col rounded-2xl bg-gradient-to-t from-[#343E3B] to-30% p-4 lg:row-span-2">
              <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 text-2xl tracking-tighter">
                {reportA.title}
              </h3>
              <time className="text-cream mb-4 text-sm italic">
                {formatDate(reportA.tripDate)}
              </time>

              <div className="grid h-40 grid-cols-2 items-start gap-4">
                <div className="relative mb-4 aspect-[4/3] h-40 w-full gap-4 overflow-hidden rounded-lg">
                  <Image
                    src={reportA.coverImageURL ?? PLACEHOLDER}
                    alt={reportA.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-cream/80 line-clamp-[7] flex-grow text-sm leading-5.5 italic">
                  {reportA.content}
                </p>
              </div>
            </article>
          )}

          {/*** SMALL CARD 1 (reportB) ***/}
          {reportB && (
            <article className="relative flex flex-col rounded-2xl">
              <div className="relative aspect-[16/9] h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={reportB.coverImageURL ?? PLACEHOLDER}
                  alt={reportB.title ?? 'Trip cover image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/50 via-60% to-transparent to-80%"></div>
              </div>

              <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2">
                <time className="text-xs italic">
                  {formatDate(reportB.tripDate)}
                </time>

                <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
                  {reportB.title}
                </h4>
              </div>
            </article>
          )}

          <div>
            {/*** SMALL CARD 2 (reportC) ***/}
            {reportC && (
              <article className="relative flex flex-col rounded-2xl">
                <div className="relative aspect-[16/9] h-31.5 w-full overflow-hidden rounded-lg">
                  <Image
                    src={reportC.coverImageURL ?? PLACEHOLDER}
                    alt={reportC.title ?? 'Trip cover image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80%"></div>
                </div>
                <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2">
                  <time className="text-xs italic">
                    {formatDate(reportB.tripDate)}
                  </time>

                  <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
                    {reportB.title}
                  </h4>
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
