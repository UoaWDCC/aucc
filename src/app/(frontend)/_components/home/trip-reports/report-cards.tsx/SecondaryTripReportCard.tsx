import React from 'react'
import Image from 'next/image'

import { formatDate } from '@/lib/utils/formatDate'

const PLACEHOLDER = '/hero_background_Image.jpg'

export interface TripReportCardProps {
  title: string
  tripDate: string
  coverImageURL: string
  content: string
}

export const SecondaryTripReportCard = ({
  report,
}: {
  report: TripReportCardProps
}) => {
  return (
    <section>
      <div className="block md:hidden">
        <MobileSecondaryTripReportCard report={report} />
      </div>
      <div className="hidden md:block">
        <DesktopTabletSecondaryTripReportCard report={report} />
      </div>
    </section>
  )
}

const MobileSecondaryTripReportCard = ({
  report,
}: {
  report: TripReportCardProps
}) => {
  return (
    <article className="flex flex-col rounded-2xl">
      <div className="relative aspect-[16/9] h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={report.coverImageURL ?? PLACEHOLDER}
          alt={report.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/50 via-60% to-transparent to-80%"></div>
        <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2">
          <time className="text-xs italic">{formatDate(report.tripDate)}</time>

          <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
            {report.title}
          </h4>
        </div>
      </div>
    </article>
  )
}

const DesktopTabletSecondaryTripReportCard = ({
  report,
}: {
  report: TripReportCardProps
}) => {
  return (
    <div className="group relative col-span-2 row-span-2 h-full w-full">
      <article className="relative flex flex-col rounded-2xl">
        {/* Default view */}
        <div className="relative aspect-[16/9] h-50 w-full overflow-hidden rounded-lg transition-opacity duration-300 lg:opacity-100 lg:hover:opacity-0">
          <Image
            src={report.coverImageURL ?? PLACEHOLDER}
            alt={report.title ?? 'Trip cover image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/50 via-60% to-transparent to-80%" />
          <div className="text-cream absolute inset-0 z-10 flex flex-col justify-end px-7 py-6">
            <time className="text-xs italic">
              {formatDate(report.tripDate)}
            </time>
            <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
              {report.title}
            </h4>
          </div>
        </div>
      </article>

      {/* Hover view */}
      <article className="absolute inset-0 z-20 flex transform flex-col overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:scale-103">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#345C53] from-43% to-[#1E2A29] to-100%" />

        <div className="absolute inset-0 z-10 flex flex-col px-7 py-6">
          <p className="from-cream/90 via-cream/65 to-cream/30 line-clamp-4 flex-grow bg-gradient-to-b bg-clip-text text-sm leading-5.5 text-transparent italic">
            {report.content}
          </p>
          <div className="text-cream flex flex-col justify-end">
            <time className="text-xs italic">
              {formatDate(report.tripDate)}
            </time>
            <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
              {report.title}
            </h4>
          </div>
        </div>
      </article>
    </div>
  )
}
