import React from 'react'

import { TripReport } from '@/payload-types'
import { TripReportCard } from './TripReportCard'

interface TripReportsGridProps {
  tripReports: TripReport[]
}

export function TripReportsGrid({ tripReports }: TripReportsGridProps) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-4">
      {tripReports.map((report) => (
        <TripReportCard key={report.id} report={report} />
      ))}
    </div>
  )
}
