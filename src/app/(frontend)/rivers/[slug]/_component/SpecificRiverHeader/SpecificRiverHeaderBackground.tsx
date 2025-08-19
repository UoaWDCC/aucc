import { ReactNode } from 'react'

import { SpecificRiverHeaderTopCurve } from './SpecificRiverHeaderTopCurve'

interface SpecificRiverHeaderBackgroundProps {
  children?: ReactNode
}

export function SpecificRiverHeaderBackground({
  children,
}: SpecificRiverHeaderBackgroundProps) {
  return (
    <div className="relative w-full bg-[#d3e2da]">
      <SpecificRiverHeaderTopCurve />
      {children}
    </div>
  )
}
