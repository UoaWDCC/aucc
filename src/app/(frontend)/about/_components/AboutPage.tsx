import React, { Suspense } from 'react'

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

      <ExecsSection execs={execs} />
    </>
  )
}
