import { ReactNode } from 'react'
import Image from 'next/image'

import backgroundImage from '@/assets/upcoming-trip-background.webp'

interface TripsSectionBackgroundProps {
  children: ReactNode
}

export function UpcomingTripsSectionBackground({
  children,
}: TripsSectionBackgroundProps) {
  return (
    <div className="bg-water relative inset-0 flex min-h-[800px] w-full items-center justify-center py-20">
      <div className="relative z-10 w-full">{children}</div>
      <Image
        src={backgroundImage}
        alt="Upcoming trips background"
        fill
        className="absolute inset-0 object-cover"
      />
    </div>
  )
}
