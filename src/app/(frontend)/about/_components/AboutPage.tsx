import { Suspense } from 'react'

import { ExecsGrid } from '@/app/(frontend)/about/_components/ExecsGrid'
import { ExecsGridFallback } from '@/app/(frontend)/about/_components/ExecsGridFallback'
import { Exec } from '@/payload-types'

interface AboutPageProps {
  execs: Exec[]
}

export function AboutPage({ execs }: AboutPageProps) {
  return (
    <div className="p-4">
      <div className="text-left">
        <h1 className="text-2xl font-bold">About Us</h1>
        <h2 className="text-gray-600">About us text</h2>
      </div>
      <br></br>
      <div className="text-left">
        <h1 className="text-2xl font-bold">Execs</h1>
        <h2 className="text-gray-600">A list of all execs available</h2>
      </div>
      <Suspense fallback={<ExecsGridFallback />}>
        <ExecsGrid execs={execs} />
      </Suspense>
    </div>
  )
}
