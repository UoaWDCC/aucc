import React, { Suspense } from 'react'

import { ExecsGrid } from '@/app/(frontend)/about/_components/ExecsGrid'
import { ExecsGridFallback } from '@/app/(frontend)/about/_components/ExecsGridFallback'
import { Exec } from '@/payload-types'
import { ContactUsSection } from './contact-us/ContactUsSection'
import { ExecsSection } from './Execs/ExecsSection'
import { AboutHeaderSection } from './header/AboutHeaderSection'
import { HeaderSubSection } from './header/HeaderSubSection'

interface AboutPageProps {
  execs: Exec[]
}

export function AboutPage({ execs }: AboutPageProps) {
  return (
    <>
      <AboutHeaderSection />

      <HeaderSubSection />

      <ContactUsSection />

      <ExecsSection />

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
