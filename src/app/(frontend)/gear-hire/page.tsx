import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getGearHireGlobal } from '@/queries/gear-hire-global'
import { GearHirePage } from './_components/GearHirePage'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Gear Hire',
    description:
      'Hire kayaks, paddles and safety gear from AUCC for trips and training.',
    path: '/gear-hire',
    image: await headerImageOf(getGearHireGlobal),
  })
}

export default async function Page() {
  const { headerImage, introText } = await getGearHireGlobal()
  return <GearHirePage headerImage={headerImage} introText={introText} />
}
