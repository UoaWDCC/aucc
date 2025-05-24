import { Suspense } from 'react'

import { TripReport } from '@/payload-types'
import { TripReportsGrid } from './TripReportsGrid'
import { TripReportsGridFallback } from './TripReportsGridFallback'

interface TripReportsPageProps {
  tripReports: TripReport[]
}

export function TripReportsPage({ tripReports }: TripReportsPageProps) {
  return (
    <div className="p-4">
      <div className="text-left">
        <h1 className="text-2xl font-bold">Trip Reports</h1>
        <h2 className="text-gray-600">A list of all trip reports available.</h2>
      </div>
      <Suspense fallback={<TripReportsGridFallback />}>
        <TripReportsGrid tripReports={tripReports} />
      </Suspense>
    </div>
  )
}
