import React from 'react'

import { PayloadImage } from '@/components/PayloadImage'
import { Media } from '@/payload-types'

export interface TripReportCardProps {
  title: string
  tripDate: string
  featuredImage: Media | undefined
  content: string
}

export const PrimaryTripReportCard = ({
  content,
  tripDate,
  title,
  featuredImage,
}: TripReportCardProps) => {
  return (
    <div className="group relative col-span-2 flex cursor-pointer flex-col overflow-hidden rounded-2xl p-4 md:h-93">
      <PayloadImage media={featuredImage} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1E2A29] to-[#5E665E]/0" />
      <div className="to-abyss absolute inset-0 z-20 rounded-lg bg-gradient-to-t from-[#343E3B] to-30% transition-opacity duration-400 lg:group-hover:opacity-0" />
      <div className="relative z-30">
        <h3 className="text-cream font-heading mt-2 line-clamp-2 text-2xl tracking-tighter md:px-5 md:pt-8">
          {title}
        </h3>
        <span className="text-cream mb-4 text-sm italic md:mb-7 md:px-6 md:pt-2">
          {tripDate}
        </span>
        <div className="grid h-40 grid-cols-2 items-start gap-4 transition-opacity duration-400 md:grid-cols-1 lg:group-hover:opacity-0">
          <div className="relative mb-4 aspect-[4/3] h-40 w-full overflow-hidden rounded-lg md:hidden">
            <PayloadImage media={featuredImage} className="object-cover" />
          </div>
          <p className="text-cream/80 line-clamp-7 flex-grow text-sm leading-5.5 whitespace-pre-line italic md:line-clamp-8 md:px-6 md:pt-6">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
