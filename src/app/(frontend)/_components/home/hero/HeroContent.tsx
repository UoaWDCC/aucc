import { CTAButton } from './CTAButton'
import { ScrollCue } from './ScrollCue'

export function HeroContent() {
  return (
    <div className="text-cream relative z-20 -mt-30 inline-block w-auto px-4 text-center md:mt-60 md:-translate-y-40">
      <h1 className="text-[30px] font-extrabold tracking-[.1em] [word-spacing:20px] md:text-2xl lg:text-[40px]">
        WELCOME TO
        <br />
        <span className="font-heading text-8xl drop-shadow-xl md:text-[84px] lg:text-[140px]">
          AUCC
        </span>
      </h1>
      <div className="flex w-auto flex-col md:flex-row md:gap-8 lg:gap-11">
        <h2 className="mt-1 flex h-auto flex-row text-base italic md:mt-4 md:ml-0 md:text-left md:text-[10px] lg:text-[16px]">
          Whitewater kayaking &amp; rafting <br />
          in New Zealand’s most beautiful places
        </h2>
        <CTAButton />
      </div>
    </div>
  )
}
