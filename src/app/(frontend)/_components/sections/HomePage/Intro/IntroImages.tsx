import Image from 'next/image'
import { object } from 'zod'

import { env } from '@/lib/env'

export function IntroImages() {
  return (
    <>
      <div className="relative mt-31 mr-auto ml-auto h-auto max-w-140">
        <div className="absolute -left-4 aspect-[54/44] w-[58%] overflow-hidden rounded-2xl">
          <Image
            // md:top-29 md:aspect-auto md:h-74 md:w-92   -Scrapped breakpoint code, consider breakpoint after design done
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-01.v1.webp`}
            fill
            objectFit="cover"
            alt="Intro picture 1"
          />
        </div>
        <div className="absolute right-[32%] z-2 mt-[50%] aspect-[20/25] w-[22%] overflow-hidden rounded-2xl">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-02.v1.webp`}
            fill
            objectFit="cover"
            alt="Intro picture 2"
          />
        </div>
        <div className="absolute right-4 z-1 mt-[21%] aspect-[28/43] w-[30%] overflow-hidden rounded-2xl">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-03.v1.webp`}
            fill
            objectFit="cover"
            alt="Intro picture 3"
          />
        </div>
      </div>
      <div
        className="absolute top-25 -left-9 h-[calc(0.21*65vw)] w-[65%] min-w-75 origin-top-right rotate-7 overflow-hidden"
        //  md:top-85 md:-right-[75*4px] md:left-auto md:w-170 md:rotate-90   -Scrapped breakpoint code, consider breakpoint after design done
      >
        <Image
          src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/paddle.v1.webp`}
          fill
          objectFit="cover"
          alt="Paddle"
        />
      </div>
    </>
  )
}
