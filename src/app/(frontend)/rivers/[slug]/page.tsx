import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getRiverBySlug } from '@/queries/rivers'
import { RiverPage } from './_component/RiverPage'
import { RiverPageFallback } from './_component/RiverPageFallback'

export default async function SpecificRiverPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const river = await getRiverBySlug(slug)

  console.log(river)

  if (!river) {
    notFound()
  }

  return (
    <div>
      <div>
        <h1>Welcome to the specific river page, current trip is {slug}</h1>
        <Suspense fallback={<RiverPageFallback />}>
          <RiverPage river={river} />
        </Suspense>
      </div>
    </div>
  )
}
