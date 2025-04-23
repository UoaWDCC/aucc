import { Suspense } from 'react'

import { getRivers } from '@/queries/rivers'
import { RiversGrid } from './_components/RiversGrid'
import { RiversGridFallback } from './_components/RiversGridFallback'

export default async function RiversPage() {
  const { rivers } = await getRivers({ limit: 10 })

  // Artificial delay to simulate a slow network
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold">Rivers</h1>
        <h2 className="text-gray-600">
          A list of all rivers available for paddling.
        </h2>
      </div>

      <div className="mt-4">
        <Suspense fallback={<RiversGridFallback />}>
          <RiversGrid rivers={rivers} />
        </Suspense>
      </div>
    </div>
  )
}
