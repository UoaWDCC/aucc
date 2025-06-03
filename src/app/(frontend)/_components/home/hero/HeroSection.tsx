import { BackgroundImage } from './BackgroundImage'
import { HeroBottomCurve } from './HeroBottomCurve'
import { HeroContent } from './HeroContent'
import { Overlay } from './Overlay'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gray-900">
      <HeroBottomCurve className="absolute -bottom-px z-1" />
      <BackgroundImage
        src="/hero_background_Image.jpg"
        alt="Kayaking in New Zealand"
      />
      <Overlay />
      <HeroContent />
    </section>
  )
}
