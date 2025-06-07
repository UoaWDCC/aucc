import React from 'react'
import Image from 'next/image'

import { getPlainText } from '@/lib/utils/get-plain-text'
import { SARButton } from './SARButton'

const PLACEHOLDER = '/hero_background_Image.jpg'

interface TripReportCardProps {
  title: string
  tripDate: string
  coverImageURL: string
  content: string
}

interface TripReportsSectionProps {
  tripReports: TripReportCardProps[]
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
    <div className="h-188 min-h-96 bg-[conic-gradient(from_-100deg,#424B44_0deg,#78ACAD_55.3116deg,#BED66D_204.231deg,#3E433D_355.905deg,#424B44_360deg)]">
      <section className="px-4 pt-20 pb-12 md:px-16 lg:px-72">
        <div className="flex items-center pl-1.5">
          <svg
            width="27"
            height="80"
            viewBox="0 0 27 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3742 9.15649C24.1801 7.41013 24.0727 5.10787 22.7908 3.42981"
              stroke="#EFEFE1"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M13.1833 15.282C11.4206 15.0116 10.0856 13.6039 8.66617 12.6587C7.89977 12.1484 6.41536 11.5567 6.10571 10.6427"
              stroke="#EFEFE1"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M2.46411 28.7404L8.49955 29.6662"
              stroke="#EFEFE1"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>

          <h2 className="text-cream font-(heading: --Rubik-Mono-One) mb-3 text-center text-3xl font-extrabold">
            LATEST&nbsp;&nbsp;&nbsp;REPORTS
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2">
          {/*** BIG CARD (reportA) ***/}
          {reportA && (
            <article className="col-span-2 flex h-70 flex-col rounded-2xl bg-[#0A0F0C]/90 p-4 sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <h3 className="text-cream font-(heading: --Rubik-Mono-One) mt-2 mb-1 text-2xl font-extrabold">
                {reportA.title}
              </h3>
              <time className="text-cream font-(body: --Rubik) mb-4 text-sm italic">
                {formatDate(reportA.tripDate)}
              </time>

              <div className="grid grid-cols-2 items-start gap-4">
                <div className="relative mb-4 aspect-[4/3] w-full gap-4 overflow-hidden rounded-lg">
                  <Image
                    src={reportA.coverImageURL ?? PLACEHOLDER}
                    alt={reportA.title}
                    fill
                    className="object-cover"
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
              <div
                className="relative aspect-[16/9] h-48 w-full overflow-hidden rounded-lg"
                style={{
                  backgroundImage: `url('${reportB.coverImageURL ?? PLACEHOLDER}')`,
                }}
              >
                <div className="text-cream absolute bottom-2 left-3">
                  <time className="font-(body: --Rubik) text-xs italic">
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
                <div
                  className="relative aspect-[16/9] h-31.5 w-full overflow-hidden rounded-lg"
                  style={{
                    backgroundImage: `url('${reportC.coverImageURL ?? PLACEHOLDER}')`,
                  }}
                >
                  <div className="text-cream absolute bottom-2 left-2">
                    <time className="font-(body: --Rubik) text-xs italic">
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
