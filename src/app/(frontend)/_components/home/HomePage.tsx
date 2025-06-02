import type { TripReport } from '@/payload-types'
import { ContactUsSection } from './contact-us/ContactUsSection'
import { GallerySection } from './gallery/GallerySection'
import { HeroSection } from './hero/HeroSection'
import { IntroSection } from './intro/IntroSection'
import { NextAdventureSection } from './next-adventure/NextAdventureSection'
import { TripReportsSection } from './trip-reports/TripReportsSection'

interface HomePageProps {
  latestReports: TripReport[]
}

export function HomePage({ latestReports }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <NextAdventureSection />
      <GallerySection />
      <TripReportsSection tripReports={latestReports} />
      <ContactUsSection />
    </>
  )
}
