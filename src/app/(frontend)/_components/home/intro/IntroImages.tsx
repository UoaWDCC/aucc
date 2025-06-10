import Image from 'next/image'
import { object } from 'zod'

import { env } from '@/lib/env'

export function IntroImages() {
  return (
    <>
      <div className="relative mt-31 mr-auto ml-auto h-auto max-w-140 md:-mt-44 md:ml-0 xl:-mt-71">
        <div className="absolute -left-4 aspect-[54/44] w-[58%] overflow-hidden rounded-2xl md:-left-11 md:h-44 md:w-55 xl:h-74 xl:w-92">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-01.v1.webp`}
            fill
            className="object-cover"
            alt="Intro picture 1"
          />
        </div>
        <div className="absolute right-[32%] z-2 mt-[50%] aspect-[20/25] w-[22%] overflow-hidden rounded-2xl md:left-46 md:mt-38 md:h-22 md:w-18 xl:left-85 xl:mt-64 xl:h-37 xl:w-30">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-02.v1.webp`}
            fill
            className="object-cover"
            alt="Intro picture 2"
          />
        </div>
        <div className="absolute right-4 z-1 mt-[21%] aspect-[28/43] w-[30%] overflow-hidden rounded-2xl md:left-26 md:mt-47 md:h-37 md:w-24 xl:left-51 xl:mt-79 xl:h-62 xl:w-40">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-03.v1.webp`}
            fill
            className="object-cover"
            alt="Intro picture 3"
          />
        </div>
      </div>
      <div className="xl: absolute top-25 -left-9 h-[calc(0.21*65vw)] w-[65%] min-w-75 origin-top-right rotate-7 overflow-hidden md:-top-2 md:right-10 md:left-auto md:mr-[7%] md:h-20 md:w-115 md:origin-top-right md:-rotate-90 xl:mt-4 xl:w-182">
        <Image
          src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/paddle.v1.webp`}
          fill
          className="-scale-y-100 object-cover"
          alt="Paddle"
        />
      </div>
    </>
  )
}
