import React from 'react'

import { TripReport } from '@/payload-types'
import { TripReportCard } from './TripReportCard'

interface TripReportsGridProps {
  reportsList: TripReport[]
}

export function TripReportsGrid({ reportsList }: TripReportsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {reportsList.map((report) => (
        <TripReportCard key={report.id} report={report} />
      ))}
    </div>
  )
}
