import { BackgroundImage } from './BackgroundImage'
import { HeroBottomCurve } from './HeroBottomCurve'
import { HeroContent } from './HeroContent'
import { ScrollCue } from './ScrollCue'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="flex">
        <BackgroundImage alt="Kayaking in New Zealand" />
        <HeroContent />
      </div>
      <ScrollCue />
      <HeroBottomCurve />
    </section>
  )
}
