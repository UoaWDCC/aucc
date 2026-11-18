import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getTripReportsGlobal } from '@/queries/trip-reports-global'
import { TripReportsPage } from './_components/TripReportsPage'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Trip Reports',
    description:
      'Stories and photos from AUCC kayaking trips around New Zealand.',
    path: '/trip-reports',
    image: await headerImageOf(getTripReportsGlobal),
  })
}

export default async function Page() {
  const { headerImage, introText } = await getTripReportsGlobal()
  return <TripReportsPage headerImage={headerImage} introText={introText} />
}
