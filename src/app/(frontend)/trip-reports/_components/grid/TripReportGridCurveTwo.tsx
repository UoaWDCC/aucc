import React from 'react'

import { cn } from '@/lib/utils/cn'

export default function TripReportGridCurveTwo({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      width="1280"
      height="943"
      viewBox="0 0 1280 943"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={cn('fill-water', className)}
    >
      <path d="M0 26.5683C323.188 -82.7788 690.573 187.513 1026.61 96.3271C1128.99 68.5462 1211.47 35.074 1280 1.84665V943H0V26.5683Z" />
    </svg>
  )
}
