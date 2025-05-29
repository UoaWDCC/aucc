import { ContactUsSection } from './contact-us/ContactUsSection'
import { GallerySection } from './gallery/GallerySection'
import { HeroSection } from './hero/HeroSection'
import { IntroSection } from './intro/IntroSection'
import { NextAdventureSection } from './next-adventure/NextAdventureSection'
import { TripReportsSection } from './trip-reports/TripReportsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <NextAdventureSection />
      <GallerySection />
      <TripReportsSection />
      <ContactUsSection />
    </>
  )
}
