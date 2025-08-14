import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReports } from '@/queries/trip-reports'
import { getTripReportsGlobal } from '@/queries/trip-reports-global'
import { TripReportsPage } from './_components/TripReportsPage'

export default async function Page() {
  const { tripReports } = await getTripReports()
  const { headerImage, introText } = await getTripReportsGlobal()
  return (
    <TripReportsPage
      tripReports={tripReports}
      headerImage={headerImage}
      introText={introText}
    />
  )
}
