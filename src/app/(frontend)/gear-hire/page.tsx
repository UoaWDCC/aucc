import { getGearHireGlobal } from '@/queries/gear-hire-global'
import { GearHirePage } from './_components/GearHirePage'

export default async function Page() {
  const { headerImage, introText } = await getGearHireGlobal()
  return <GearHirePage headerImage={headerImage} introText={introText} />
}
