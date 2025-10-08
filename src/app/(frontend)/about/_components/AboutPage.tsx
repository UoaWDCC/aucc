import React, { Suspense } from 'react'

import { ExecsGrid } from '@/app/(frontend)/about/_components/ExecsGrid'
import { ExecsGridFallback } from '@/app/(frontend)/about/_components/ExecsGridFallback'
import { Exec } from '@/payload-types'
import { AboutHeaderSection } from './header/AboutHeaderSection'

interface AboutPageProps {
  execs: Exec[]
}

export function AboutPage({ execs }: AboutPageProps) {
  return (
    <>
      <div className="z-10 flex w-full justify-center align-middle">
        <AboutHeaderSection />
      </div>
      <br></br>
      <div className="text-left">
        <h1 className="text-2xl font-bold">Execs</h1>
        <h2 className="text-gray-600">A list of all execs available</h2>
      </div>
      <Suspense fallback={<ExecsGridFallback />}>
        <ExecsGrid execs={execs} />
      </Suspense>
    </>
  )
}
