import { notFound } from 'next/navigation'

import { getRiverBySlug } from '@/queries/rivers'
import { RiverPage } from './_component/RiverPage'

export default async function SpecificRiverPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const river = await getRiverBySlug(slug)

  if (!river) {
    notFound()
  }

  return (
    <div>
      <div>
        <h1>Welcome to the specific river page, current trip is {slug}</h1>
        <RiverPage river={river} />
      </div>
    </div>
  )
}
