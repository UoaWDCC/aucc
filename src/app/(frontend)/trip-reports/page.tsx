import { getTripReports } from '@/queries/trip-reports'
import { getTripReportsGlobal } from '@/queries/trip-reports-global'
import { TripReportsPage } from './_components/TripReportsPage'

export default async function Page() {
  try {
    const { tripReports } = await getTripReports({ depth: 1 })
    const { headerImage, introText } = await getTripReportsGlobal()
    return (
      <TripReportsPage
        tripReports={tripReports}
        headerImage={headerImage}
        introText={introText}
      />
    )
  } catch (error) {
    console.error('Error loading trip reports page:', error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Trip Reports</h1>
          <p>Unable to load trip reports data. Please try again later.</p>
        </div>
      </div>
    )
  }
}
