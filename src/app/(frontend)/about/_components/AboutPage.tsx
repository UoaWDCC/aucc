import { Exec } from '@/payload-types'
import type { SiteSettingsDTO } from '@/queries/site-settings'
import { ContactUsSection } from './contact-us/ContactUsSection'
import { ExecsSection } from './Execs/ExecsSection'
import { AboutHeaderSection } from './header/AboutHeaderSection'
import { HeaderSubSection } from './header/HeaderSubSection'
import { SocialsSection } from './socials/SocialsSection'

interface AboutPageProps {
  execs: Exec[]
  settings: SiteSettingsDTO
}

export function AboutPage({ execs, settings }: AboutPageProps) {
  return (
    <div className="w-full overflow-hidden">
      <AboutHeaderSection />

      <HeaderSubSection />

      <ContactUsSection
        contactEmail={settings.contactEmail}
        contactNote={settings.contactNote}
        address={settings.address}
      />

      <ExecsSection execs={execs} />

      <SocialsSection socials={settings.socials ?? []} />
    </div>
  )
}
