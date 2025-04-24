import React, { Suspense } from 'react'

import { GetTripReports } from './_components/GetTripReports'
import { TripReportsGrid } from './_components/TripReportsGrid'
import { TripReportsGridFallback } from './_components/TripReportsGridFallback'

export default async function TripReportsPage() {
  const { docs: reports } = await GetTripReports(1, 20, '-createdAt')

  return (
    <div className="p-4">
      <div className="text-left">
        <h1 className="text-2xl font-bold">Trip Reports</h1>
        <h2 className="text-gray-600">A list of all trip reports available.</h2>
      </div>
      <Suspense fallback={<TripReportsGridFallback />}>
        <TripReportsGrid reportsList={reports} />
      </Suspense>
    </div>
  )
}
