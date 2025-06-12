import { BackgroundImage } from './BackgroundImage'
import { HeroBottomCurve } from './HeroBottomCurve'
import { HeroContent } from './HeroContent'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center md:items-center">
      <div className="flex">
        <BackgroundImage alt="Kayaking in New Zealand" />
        <HeroContent />
      </div>
      <HeroBottomCurve />
    </section>
  )
}
