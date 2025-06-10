import Image from 'next/image'

import { env } from '@/lib/env'

export function ContactImages() {
  return (
    // Removed mx-auto and max-w-140 from here
    // The h-auto is also likely not needed here if the inner div has a fixed height
    <div className="relative mt-28">
      {/* This div is now the full width of its parent (which is now w-full) */}
      <div className="relative h-[850px] w-full">
        {/* Image 1: Bottom-right */}
        <div className="absolute right-[0%] bottom-[50%] z-10 aspect-[4/3] h-auto w-[25%] overflow-hidden rounded-[16px] md:bottom-[70%] md:w-[12%] lg:bottom-[72%] lg:w-[11%]">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-01.v1.webp`}
            fill
            className="object-cover"
            alt="Looking picture 1"
          />
        </div>

        {/* Image 2: Top-right */}
        <div className="absolute top-[0%] right-[0%] z-10 aspect-[5/8] h-auto w-[42%] overflow-hidden rounded-[16px] md:top-[-38%] md:w-[20%] lg:top-[-40%] lg:w-[18%]">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-02.v1.webp`}
            fill
            className="object-cover"
            alt="Looking picture 2"
          />
        </div>

        {/* Image 3: Center-left */}
        <div className="absolute top-[22%] left-[46%] z-20 aspect-[2/3] h-auto w-[24%] overflow-hidden rounded-[16px] md:top-[-10%] md:right-[13%] md:left-auto md:w-[13%] lg:top-[-12%] lg:right-[12%] lg:left-auto lg:w-[11%]">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-03.v1.webp`}
            fill
            className="object-cover"
            alt="Looking picture 3"
          />
        </div>
      </div>
    </div>
  )
}
