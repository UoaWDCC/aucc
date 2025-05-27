import { Suspense } from 'react'

import { getExecs } from '@/queries/execs'
import { ExecsGrid } from './_components/ExecsGrid'
import { ExecsGridFallback } from './_components/ExecsGridFallback'

export default async function AboutPage() {
  const { execs } = await getExecs()

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
