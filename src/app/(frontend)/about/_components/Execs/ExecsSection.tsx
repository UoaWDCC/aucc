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

      <div className="absolute -top-40 left-40 z-110 flex h-120 w-120 items-center justify-center rounded-[650px] bg-[#D3E2DA]">
        <div className="text-abyss text-heading w-90 px-8 text-center text-[16px] italic">
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

      <div className="bg-cream h-fill relative z-30 -mt-[44vw] pb-20">
        <div className="px-50">
          <Suspense fallback={<ExecsGridFallback />}>
            <ExecsGrid execs={execs} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
