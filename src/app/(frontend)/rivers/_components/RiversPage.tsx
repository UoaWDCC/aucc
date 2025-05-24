import React, { Suspense } from 'react'

import { River } from '@/payload-types'
import { RiversGrid } from './RiversGrid'
import { RiversGridFallback } from './RiversGridFallback'

interface RiversPageProps {
  rivers: River[]
}

export function RiversPage({ rivers }: RiversPageProps) {
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
