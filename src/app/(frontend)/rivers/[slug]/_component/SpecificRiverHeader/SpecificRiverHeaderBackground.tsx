import { ReactNode } from 'react'

import { SpecificRiverHeaderTopCurve } from './SpecificRiverHeaderTopCurve'

interface SpecificRiverHeaderBackgroundProps {
  children?: ReactNode
}

export function SpecificRiverHeaderBackground({
  children,
}: SpecificRiverHeaderBackgroundProps) {
  return (
    <div className="relative h-248 w-full bg-[#d3e2da]">
      <SpecificRiverHeaderTopCurve className="relative top-0 h-115 w-full" />
      {children}
    </div>
  )
}
