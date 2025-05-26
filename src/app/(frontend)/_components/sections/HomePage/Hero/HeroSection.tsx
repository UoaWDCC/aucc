'use client'

import { BackgroundImage } from './BackgroundImage'
import { HeroContent } from './HeroContent'
import { Overlay } from './Overlay'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gray-900">
      <BackgroundImage
        src="/hero_background_Image.jpg"
        alt="Kayaking in New Zealand"
      />
      <Overlay />
      <HeroContent />
    </section>
  )
}
