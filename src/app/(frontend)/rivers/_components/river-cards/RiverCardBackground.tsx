import { ReactNode } from 'react'
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
    <div className="bg-cream relative h-full w-full">
      <LightWaveTop />
      <div className="absolute top-3 bottom-[60px] -left-20 z-20 h-[51.8%] w-[52.4%] -rotate-[20deg] opacity-10 max-[454px]:-top-10 md:top-27 md:-left-60 lg:top-[75px] lg:-left-70">
        <Logo />
      </div>
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
      <div className="relative z-30">{children}</div>
    </div>
  )
}
