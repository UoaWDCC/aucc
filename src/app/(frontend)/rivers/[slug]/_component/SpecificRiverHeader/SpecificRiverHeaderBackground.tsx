import { ReactNode } from 'react'

import { SpecificRiverHeaderTopCurve } from './SpecificRiverHeaderTopCurve'

interface SpecificRiverHeaderBackgroundProps {
  children?: ReactNode
}

export function SpecificRiverHeaderBackground({
  children,
}: SpecificRiverHeaderBackgroundProps) {
  return (
    <div className="relative flex h-248 w-full flex-col bg-[#d3e2da]">
      <SpecificRiverHeaderTopCurve className="absolute top-0 z-1 h-65 w-full md:h-115" />
      <div className="z-2 flex w-full flex-col">{children}</div>
    </div>
  )
}
