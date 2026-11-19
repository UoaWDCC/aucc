import Image from 'next/image'

import whoAreWeImage from '@/assets/who-are-we.webp'
import { HeaderSubSectionBackground } from './HeaderSubSectionBackground'

// Below xl the text and circles stack in normal flow on a cream background.
// From xl up they sit absolutely over the curved background, as designed.
export function HeaderSubSection() {
  return (
    <div className="relative w-full">
      <HeaderSubSectionBackground />

      <div className="relative z-20 -mt-px flex flex-col gap-4 bg-[#EFEFE1] px-6 pb-12 xl:absolute xl:bottom-[18vh] xl:left-[12vw] xl:mt-0 xl:bg-transparent xl:p-0">
        <h2 className="font-heading text-algae text-4xl md:text-6xl">
          Who are we?
        </h2>

        <div className="text-abyss mt-4 max-w-2xl text-[16px] italic">
          AUCC is a whitewater club affiliated to the University of{' '}
          <br className="hidden xl:inline" />
          Auckland. We are one of the oldest canoe clubs in New Zealand,{' '}
          <br className="hidden xl:inline" />
          tracing our history back to 1949. <br />
          <br />
          Incorporated Society Registration Number 222220. <br />
          Charity Registration Number CC53093.
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 bg-[#EFEFE1] pb-16 xl:contents">
        <div className="relative z-20 flex h-72 w-72 items-center justify-center rounded-full bg-[#D3E2DA] sm:h-96 sm:w-96 xl:absolute xl:right-[30vw] xl:-bottom-60 xl:h-120 xl:w-120 xl:rounded-[460px]">
          <div className="relative z-30 h-64 w-64 overflow-hidden rounded-full sm:h-88 sm:w-88 xl:h-110 xl:w-110 xl:rounded-[440px]">
            <Image
              src={whoAreWeImage}
              alt="Who are we"
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 440px, (min-width: 640px) 352px, 256px"
            />
          </div>
        </div>
        <div className="font-unbounded relative z-20 flex h-72 w-72 items-center justify-center rounded-full bg-[#D3E2DA] xl:absolute xl:top-1/2 xl:-right-14 xl:h-120 xl:w-120 xl:-translate-y-1/2 xl:rounded-[460px]">
          <div className="relative max-w-[200px] text-center text-2xl font-bold text-[#89ACAD] xl:max-w-[280px] xl:text-4xl">
            2017 RUNNER-UP SPORTS CLUB OF THE YEAR
          </div>
        </div>
      </div>
    </div>
  )
}
