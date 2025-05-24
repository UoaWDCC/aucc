import { getTripReports } from '@/queries/trip-reports'
import { TripReportsPage } from './_components/TripReportsPage'

export default async function Page() {
  const { tripReports } = await getTripReports()

  return <TripReportsPage tripReports={tripReports} />
}
