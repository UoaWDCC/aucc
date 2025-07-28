import { BackgroundImage } from './BackgroundImage'
import { HeroBottomCurve } from './HeroBottomCurve'
import { HeroContent } from './HeroContent'
import { ScrollCue } from './ScrollCue'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh+56px)] flex-col items-center justify-center md:min-h-[calc(100dvh+0.09*100dvw)]">
      <div className="flex">
        <BackgroundImage alt="Kayaking in New Zealand" />
        <HeroContent />
      </div>
      <ScrollCue />
      <HeroBottomCurve />
    </section>
  )
}
