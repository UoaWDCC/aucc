import { Exec } from '@/payload-types'
import { ContactUsSection } from './contact-us/ContactUsSection'
import { ExecsSection } from './Execs/ExecsSection'
import { AboutHeaderSection } from './header/AboutHeaderSection'
import { HeaderSubSection } from './header/HeaderSubSection'
import { SocialsSection } from './socials/SocialsSection'

interface AboutPageProps {
  execs: Exec[]
}

export function AboutPage({ execs }: AboutPageProps) {
  return (
    <div className="w-full overflow-hidden">
      <AboutHeaderSection />

      <HeaderSubSection />

      <ContactUsSection />

      <ExecsSection execs={execs} />

      <SocialsSection />
    </div>
  )
}
