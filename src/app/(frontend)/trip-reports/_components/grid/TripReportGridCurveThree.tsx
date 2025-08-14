import React from 'react'

import { cn } from '@/lib/utils/cn'

export default function TripReportGridCurveThree({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      width="1280"
      height="1207"
      viewBox="0 0 1280 1207"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={cn('fill-[#89ACAD]', className)}
    >
      <path d="M0 1.11135C369.37 -18.8205 907.58 237.006 1195.38 155.375C1225.82 146.74 1253.97 137.611 1280 128.302V1207H0V1.11135Z" />
    </svg>
  )
}
