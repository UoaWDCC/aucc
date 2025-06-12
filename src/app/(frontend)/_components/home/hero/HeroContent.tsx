import { CTAButton } from './CTAButton'
import { ScrollCue } from './ScrollCue'

export function HeroContent() {
  return (
    <div className="text-cream relative z-20 mt-60 inline-block w-auto px-4 text-center md:-translate-y-50">
      <h1 className="text-2xl font-extrabold tracking-[.1em] [word-spacing:20px] lg:text-5xl">
        WELCOME TO
        <br />
        <span className="font-heading text-8xl drop-shadow-xl lg:text-[140px]">
          AUCC
        </span>
      </h1>
      <div className="flex w-auto flex-col md:flex-row">
        <h2 className="mr-10 inline-block h-auto text-left text-base italic md:mt-4 md:ml-0 lg:text-[16px]">
          Whitewater kayaking &amp; rafting <br />
          in New Zealand’s most beautiful places
        </h2>
        <CTAButton />
      </div>
    </div>
  )
}
