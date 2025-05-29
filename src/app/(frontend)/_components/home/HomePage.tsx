import { ContactUsSection } from './contact-us/ContactUsSection'
import { GallerySection } from './gallery/GallerySection'
import { HeroSection } from './hero/HeroSection'
import { NextAdventureSection } from './next-adventure/NextAdventureSection'
import { TripReportsSection } from './trip-reports/TripReportsSection'
import { WelcomeSection } from './welcome/WelcomeSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <NextAdventureSection />
      <GallerySection />
      <TripReportsSection />
      <ContactUsSection />
    </>
  )
}
