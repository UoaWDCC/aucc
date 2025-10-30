import Image from 'next/image'

import whoAreWeImage from '@/assets/who-are-we.webp'
import { HeaderSubSectionBackground } from './HeaderSubSectionBackground'

export function HeaderSubSection() {
  return (
    <div className="relative w-full">
      <HeaderSubSectionBackground />

      <div className="w-fill absolute bottom-[18vh] left-[12vw] z-20 flex flex-col gap-4">
        <h2 className="font-heading text-algae text-5xl md:text-6xl">
          Who are we?
        </h2>

        <div className="text-abyss mt-4 max-w-2xl text-[16px] italic">
          AUCC is a whitewater club affiliated to the University of <br />
          Auckland. We are one of the oldest canoe clubs in New Zealand, <br />
          tracing our history back to 1949. <br />
          <br />
          Incorporated Society Registration Number 222220. <br />
          Charity Registration Number CC53093. ​
        </div>
      </div>
      <div className="absolute right-[30vw] -bottom-60 z-20 flex h-120 w-120 items-center justify-center rounded-[460px] bg-[#D3E2DA]">
        <div className="relative z-30 h-110 w-110 overflow-hidden rounded-[440px]">
          <Image
            src={whoAreWeImage}
            alt="Who are we"
            fill
            className="object-cover"
            sizes="440px"
          />
        </div>
      </div>
      <div className="circle-award font-unbounded absolute top-1/2 -right-14 z-20 flex h-120 w-120 -translate-y-1/2 items-center justify-center rounded-[460px] bg-[#D3E2DA]">
        <div className="relative max-w-[280px] text-center text-4xl font-bold text-[#89ACAD]">
          2017 RUNNER-UP SPORTS CLUB OF THE YEAR
        </div>
      </div>
    </div>
  )
}
