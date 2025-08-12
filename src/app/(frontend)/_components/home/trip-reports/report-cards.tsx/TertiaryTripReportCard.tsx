import React from 'react'
import Image from 'next/image'

import PLACEHOLDER from '@/assets/hero.webp'
import { PayloadImage } from '@/components/PayloadImage'
import { Media } from '@/payload-types'

export interface TripReportCardProps {
  title: string
  tripDate: string
  featuredImage: Media | undefined
  content: string
}

export const TertiaryTripReportCard = ({
  content,
  tripDate,
  title,
  featuredImage,
}: TripReportCardProps) => {
  return (
    <div className="group to-abyss relative aspect-[16/9] h-31.5 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-t from-[#343E3B] to-30% md:h-41">
      <p className="from-cream/90 via-cream/65 to-cream/30 line-clamp-3 flex-grow bg-gradient-to-b bg-clip-text px-7 py-6 text-sm leading-5.5 text-transparent italic">
        {content}
      </p>
      <PayloadImage
        media={featuredImage}
        className="transition-opacity duration-400 lg:group-hover:opacity-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80%"></div>
      <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2 md:px-7 md:py-6">
        <time className="text-xs italic">{tripDate}</time>
        <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
          {title}
        </h4>
      </div>
    </div>
  )
}
