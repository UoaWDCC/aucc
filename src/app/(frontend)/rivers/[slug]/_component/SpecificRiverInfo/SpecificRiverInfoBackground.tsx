// app/(site)/rivers/[slug]/_component/SpecificRiverInfo/SpecificRiverInfoBackground.tsx
import { ReactNode } from 'react'

import { Logo } from '@/assets/Logo'

interface SpecificRiverInfoBackgroundProps {
  children?: ReactNode
}

export function SpecificRiverInfoBackground({
  children,
}: SpecificRiverInfoBackgroundProps) {
  return (
    <div>
      <div className="absolute -z-20 h-full w-full overflow-hidden bg-[#A3C6C2]">
        <div className="absolute top-[4vh] -right-[10%] z-10 w-[800px] max-w-[38vw] rotate-[25deg] opacity-10">
          <Logo />
        </div>
        <svg
          className="absolute top-200 z-1 w-full md:h-200"
          viewBox="0 0 1280 1831"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 238.52C456.159 622.347 919.044 -41.0294 1280 2.34424V1831H0V238.52Z"
            fill="#7F9F66"
          />
        </svg>
        <div className="z-2 flex w-full flex-col">{children}</div>
      </div>
      <div className=""></div>
    </div>
  )
}
