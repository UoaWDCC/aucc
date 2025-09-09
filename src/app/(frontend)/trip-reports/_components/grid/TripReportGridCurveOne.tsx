import React from 'react'

import { cn } from '@/lib/utils/cn'

export default function TripReportGridCurveOne({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      width="1280"
      height="671"
      viewBox="0 0 1280 671"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={cn('fill-seafoam', className)}
    >
      <path d="M1280 671H0V194.787C351.363 93.0958 749.253 240.059 1160.09 70.1729C1193.57 56.331 1233.92 31.5585 1280 0.759766V671Z" />
    </svg>
  )
}
