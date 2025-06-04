import { BackgroundImage } from './BackgroundImage'
import { HeroBottomCurve } from './HeroBottomCurve'
import { HeroContent } from './HeroContent'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen justify-center md:items-center">
      <BackgroundImage alt="Kayaking in New Zealand" />
      <HeroContent />
    </section>
  )
}
