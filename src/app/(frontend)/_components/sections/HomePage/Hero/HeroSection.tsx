'use client'

import { BackgroundImage } from './BackgroundImage'
import { HeroContent } from './HeroContent'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen justify-center md:items-center">
      <BackgroundImage alt="Kayaking in New Zealand" />
      <HeroContent />
    </section>
  )
}
