import { getRivers } from '@/queries/rivers'
import { getRiversGlobal } from '@/queries/rivers-global'
import { RiversPage } from './_components/RiversPage'

export default async function Page() {
  const { rivers } = await getRivers()
  const { headerImage, introText } = await getRiversGlobal()
  return <RiversPage headerImage={headerImage} introText={introText} />
}
