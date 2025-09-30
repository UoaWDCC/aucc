import React, { ReactNode } from 'react'
import Image from 'next/image'

import { Logo } from '@/assets/Logo'
import backgroundImage from '@/assets/river-card-background.webp'
import { LightWaveBottom } from './LightWaveBottom'
import { LightWaveTop } from './LightWaveTop'
import { WaterWaveMiddle } from './WaterWaveMiddle'

interface RiverCardBackgroundProps {
  children: ReactNode
}

export function RiverCardBackground({ children }: RiverCardBackgroundProps) {
  return (
    <div>
      <div className="bg-cream relative h-full w-full">
        <LightWaveTop />
        <div className="relative h-190 w-full items-center max-[373px]:h-170 md:h-210 lg:h-303">
          <Image
            src={backgroundImage}
            alt="River cards background"
            fill
            className="mt-36 object-cover object-center md:mt-73 lg:mt-75"
            priority
          />
        </div>

        <WaterWaveMiddle className="absolute inset-x-0 top-12 md:top-24" />
        <LightWaveBottom className="absolute inset-x-0 top-176 bottom-0 md:top-200 lg:top-250" />
      </div>
      <div>{children}</div>
    </div>
  )
}
