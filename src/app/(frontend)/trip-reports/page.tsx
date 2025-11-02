import { getTripReportsGlobal } from '@/queries/trip-reports-global'
import { TripReportsPage } from './_components/TripReportsPage'

export default async function Page() {
  const { headerImage, introText } = await getTripReportsGlobal()
  return <TripReportsPage headerImage={headerImage} introText={introText} />
}
