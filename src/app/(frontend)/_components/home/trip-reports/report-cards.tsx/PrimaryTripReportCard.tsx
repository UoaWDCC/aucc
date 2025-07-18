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
    <article className="group relative col-span-2 flex flex-col overflow-hidden rounded-2xl p-4 md:h-93.25">
      <Image
        src={report.coverImageURL ?? PLACEHOLDER}
        alt={report.title ?? 'Trip cover image'}
        fill
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1E2A29] to-[#5E665E]/0" />
      <div className="to-abyss absolute inset-0 z-20 rounded-lg bg-gradient-to-t from-[#343E3B] to-30% transition-opacity duration-400 lg:group-hover:opacity-0" />
      <div className="relative z-30">
        <h3 className="text-cream font-heading mt-2 line-clamp-2 text-2xl tracking-tighter md:px-5 md:pt-8">
          {report.title}
        </h3>
        <time className="text-cream mb-4 text-sm italic md:mb-7 md:px-6 md:pt-2">
          {formatDate(report.tripDate)}
        </time>
        <div className="grid h-40 grid-cols-2 items-start gap-4 transition-opacity duration-400 md:grid-cols-1 lg:group-hover:opacity-0">
          <div className="relative mb-4 aspect-[4/3] h-40 w-full overflow-hidden rounded-lg md:hidden">
            <Image
              src={report.coverImageURL ?? PLACEHOLDER}
              alt={report.title}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-cream/80 line-clamp-7 flex-grow text-sm leading-5.5 italic md:line-clamp-8 md:px-6 md:pt-6">
            {report.content}
          </p>
        </div>
      </div>
    </article>
  )
}
