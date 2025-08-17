import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import TripReportGridCurveOne from './TripReportGridCurveOne'
import TripReportGridCurveThree from './TripReportGridCurveThree'
import TripReportGridCurveTwo from './TripReportGridCurveTwo'

type TripReportsGridBackgroundProps = {
  children: ReactNode
  className?: string
}

export default function TripReportsGridBackground({
  children,
  className,
}: TripReportsGridBackgroundProps) {
  return (
    <div className="from-water to-seafoam relative isolate h-full bg-gradient-to-b to-30%">
      <TripReportGridCurveOne className="absolute inset-x-0 bottom-0 z-2 h-[30%] w-full" />
      <TripReportGridCurveTwo className="absolute inset-x-0 bottom-0 z-1 h-[55%] w-full" />
      <TripReportGridCurveThree className="absolute inset-x-0 bottom-0 z-0 h-[70%] w-full" />
      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  )
}
