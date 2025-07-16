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

export const PrimaryTripReportCard = ({
  report,
}: {
  report: TripReportCardProps
}) => {
  return (
    <section>
      <div className="block md:hidden">
        <MobilePrimaryTripReportCard report={report} />
      </div>
      <div className="hidden md:block">
        <DesktopTabletPrimaryTripReportCard report={report} />
      </div>
    </section>
  )
}

const MobilePrimaryTripReportCard = ({
  report,
}: {
  report: TripReportCardProps
}) => {
  return (
    <article className="to-abyss col-span-2 flex flex-col rounded-2xl bg-gradient-to-t from-[#343E3B] to-30% p-4">
      <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 text-2xl tracking-tighter">
        {report.title}
      </h3>
      <time className="text-cream mb-4 text-sm italic">
        {formatDate(report.tripDate)}
      </time>
      <div className="grid h-40 grid-cols-2 items-start gap-4">
        <div className="relative mb-4 aspect-[4/3] h-40 w-full overflow-hidden rounded-lg">
          <Image
            src={report.coverImageURL ?? PLACEHOLDER}
            alt={report.title}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-cream/80 line-clamp-7 flex-grow text-sm leading-5.5 italic">
          {report.content}
        </p>
      </div>
    </article>
  )
}

export const DesktopTabletPrimaryTripReportCard = ({
  report,
}: {
  report: TripReportCardProps
}) => {
  return (
    <div className="group relative col-span-2 row-span-2 h-full w-full">
      {/* Default view */}
      <article className="to-abyss col-span-2 flex h-93.25 flex-col rounded-2xl bg-gradient-to-t from-[#343E3B] to-30% p-4 lg:absolute lg:inset-0 lg:z-10 lg:opacity-100 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-0">
        <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 px-4 pt-8 text-2xl tracking-tighter">
          {report.title}
        </h3>
        <time className="text-cream mt-1 mb-7 px-5 text-sm italic">
          {formatDate(report.tripDate)}
        </time>
        <div className="grid h-40 grid-cols-1 items-start gap-4">
          <div className="relative mb-4 aspect-[4/3] h-40 w-full gap-4 overflow-hidden rounded-lg md:hidden">
            <Image
              src={report.coverImageURL ?? PLACEHOLDER}
              alt={report.title}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-cream/80 flex-grow px-5 text-sm leading-5.5 italic md:line-clamp-8">
            {report.content}
          </p>
        </div>
      </article>

      {/* Hover view */}
      <article className="absolute inset-0 z-20 flex transform flex-col overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:scale-102">
        <Image
          src={report.coverImageURL ?? PLACEHOLDER}
          alt={report.title ?? 'Trip cover image'}
          fill
          className="z-0 object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1E2A29] to-[#5E665E]/0" />
        <div className="relative z-20 flex flex-col p-5">
          <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 px-4 pt-8 text-2xl tracking-tighter">
            {report.title}
          </h3>
          <time className="text-cream mt-1 mb-7 px-5 text-sm italic">
            {formatDate(report.tripDate)}
          </time>
          <p className="line-clamp-8 text-sm leading-5.5 text-transparent italic">
            {report.content}
          </p>
        </div>
      </article>
    </div>
  )
}
