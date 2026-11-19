import { Suspense } from 'react'

import { Exec } from '@/payload-types'
import { ExecsGrid } from './ExecsGrid'
import { ExecsGridFallback } from './ExecsGridFallback'

interface ExecsSectionProps {
  execs: Exec[]
}

export async function ExecsSection({ execs }: ExecsSectionProps) {
  return (
    <div className="relative w-full">
      <div className="relative z-10 -mt-[18vw] w-full">
        <svg
          viewBox="0 0 1280 888"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M807.161 654.489C406.771 816.703 453.701 741.741 125.848 759.028C-268.871 791.115 -91.368 965.35 -143.482 846.173C-399.714 260.212 -30.0709 4.1711 1687.41 9.88237e-06C1606.84 827.114 1230.62 448.57 807.161 654.489Z"
            fill="#EFEFE1"
          />
        </svg>
      </div>
      {/* Below xl these stack on the cream background. From xl up this
          wrapper is display: contents, so its children position against
          the section as designed. */}
      <div className="bg-cream relative z-40 -mt-[44vw] flex flex-col items-center gap-12 px-6 pb-16 xl:contents">
        <div className="relative z-100 flex h-fit w-full max-w-md flex-row justify-center xl:absolute xl:top-56 xl:right-34 xl:w-fit xl:max-w-none">
          <div className="font-heading font-regular text-algae flex h-fit w-fit flex-col items-center text-center text-4xl font-bold sm:text-5xl xl:items-end xl:text-right xl:text-6xl">
            Executive Team
            <div className="text-abyss font-body mt-4 w-full text-[16px] font-normal italic xl:w-100">
              Each member plays a key role ensuring the long term success for
              the club and its members. We&apos;ll be at all club events so come
              say hi and get amongst!
            </div>
          </div>
          <div className="font-handwritten text-algae ml-4 hidden -translate-y-4 text-8xl xl:block">
            !
          </div>
        </div>

        <div className="relative z-110 flex h-80 w-80 items-center justify-center rounded-full bg-[#D3E2DA] sm:h-96 sm:w-96 xl:absolute xl:-top-40 xl:left-40 xl:h-120 xl:w-120 xl:rounded-[650px]">
          <div className="text-abyss text-heading w-72 px-4 text-center text-[15px] italic sm:w-80 sm:text-[16px] xl:w-90 xl:px-8">
            For general enquiries, please email the President/ Secretary (see
            below). For all emails, add aucc.org.nz to the <br />
            end. <br />
            i.e. Email: sample@ = sample@aucc.org.nz.
            <br />
            <br />
            For a potentially speedier response to general enquiries with all of
            our executive&apos;s contribution, leave a message on our Facebook
            page.
          </div>
        </div>
      </div>

      <div className="bg-cream h-fill relative z-30 pb-20 xl:-mt-[44vw] xl:min-h-200">
        <div className="px-6 sm:px-12 xl:px-50">
          <Suspense fallback={<ExecsGridFallback />}>
            <ExecsGrid execs={execs} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
