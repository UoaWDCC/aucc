import React from 'react'
import Link from 'next/link'

import { PayloadImage } from '@/components/PayloadImage'
import { cn } from '@/lib/utils/cn'
import { formatDate } from '@/lib/utils/formatDate'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { TripReportDTO } from '@/queries/trip-reports'

type TripReportGridCardProps = {
  tripReport: TripReportDTO
  className?: string
}

export default function TripReportGridCard({
  tripReport,
  className,
}: TripReportGridCardProps) {
  const formattedDate = formatDate(tripReport.relatedEvent.startTime)
  const content = getPlainText(tripReport.content)

  return (
    <Link
      href={`/trip-reports/${tripReport.slug}`}
      className={cn(
        'group relative flex h-auto w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E2A29] from-80% to-[#38433d] transition-transform duration-300 hover:scale-[1.02] md:flex-col md:p-6',
        className,
      )}
    >
      {/* Mobile: Horizontal layout */}
      <div className="flex w-full flex-row gap-4 md:hidden">
        <div className="relative aspect-[4/3] w-32 flex-shrink-0 overflow-hidden rounded-l-lg">
          <PayloadImage
            media={tripReport.featuredImage}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between p-4 pl-0">
          <time className="text-cream mb-2 block text-xs font-light italic opacity-90">
            {formattedDate}
          </time>
          <h3 className="text-cream font-heading mb-2 line-clamp-2 text-sm font-bold tracking-wide uppercase">
            {tripReport.title}
          </h3>
          <p className="text-cream/80 line-clamp-3 text-xs leading-relaxed italic">
            {content}
          </p>
        </div>
      </div>

      {/* Desktop: Vertical layout */}
      <div className="hidden md:flex md:flex-col">
        <div className="mb-4">
          <time className="text-cream text-sm font-light italic opacity-90">
            {formattedDate}
          </time>
        </div>

        <div className="relative mb-4 h-50 w-full overflow-hidden rounded-lg sm:mb-6">
          <PayloadImage
            media={tripReport.featuredImage}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="text-cream font-heading mb-3 line-clamp-2 text-base font-bold tracking-wide uppercase sm:text-lg lg:text-xl xl:text-2xl">
            {tripReport.title}
          </h3>
          <p className="text-cream/80 line-clamp-3 text-sm leading-relaxed italic lg:line-clamp-4">
            {content}
          </p>
        </div>
      </div>
    </Link>
  )
}
