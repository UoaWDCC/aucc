import { getRivers } from '@/queries/rivers'
import { RiversPage } from './_components/RiversPage'

export default async function Page() {
  const { rivers } = await getRivers()

  return <RiversPage rivers={rivers} />
}
