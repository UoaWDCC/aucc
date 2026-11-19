import { getRivers } from '@/queries/rivers'
import { SwimsPage } from './_components/SwimsPage'

export default async function Page() {
  const { rivers } = await getRivers({ limit: 100, sort: 'name' })

  const riverOptions = rivers.map((river) => ({
    id: river.id,
    name: river.name,
  }))

  return <SwimsPage rivers={riverOptions} />
}
