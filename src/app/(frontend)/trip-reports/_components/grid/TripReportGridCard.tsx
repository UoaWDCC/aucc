import React from 'react'
import Link from 'next/link'

import { PayloadImage } from '@/components/PayloadImage'
import { formatDate } from '@/lib/utils/formatDate'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { TripReportDTO } from '@/queries/trip-reports'

type TripReportGridCardProps = {
  tripReport: TripReportDTO
}

export default function TripReportGridCard({
  tripReport,
}: TripReportGridCardProps) {
  const formattedDate = formatDate(tripReport.relatedEvent.startTime)
  const content = getPlainText(tripReport.content)

  return (
    <Link
      href={`/trip-reports/${tripReport.slug}`}
      className="from-abyss relative h-110 w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-80% to-[#38433d] p-8"
    >
      {/* <div className=""> */}
      <div className="mb-">
        <time className="text-cream text-sm font-light italic opacity-90">
          {formattedDate}
        </time>
      </div>

      <div className="relative h-50 w-full overflow-hidden rounded-lg">
        <PayloadImage media={tripReport.featuredImage} />
      </div>

      <h3 className="text-cream font-heading my-4 mb-2 line-clamp-1 text-lg font-bold tracking-tighter uppercase md:text-xl lg:text-2xl">
        {tripReport.title}
      </h3>
      <p className="text-cream/80 line-clamp-3 text-sm leading-relaxed italic">
        {content}
      </p>
      {/* </div> */}
    </Link>
  )
}
