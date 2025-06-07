import { getTripReports } from '@/queries/trip-reports'
import { HomePage } from './_components/home/HomePage'

export default async function Page() {
  // This will get the latest trip reports for the trip report section
  const { tripReports } = await getTripReports({
    page: 1,
    limit: 8,
    sort: '-tripDate',
  })
  const latest = tripReports.filter((r) => r.status === 'published').slice(0, 3)

  return <HomePage latestReports={latest} />
}
