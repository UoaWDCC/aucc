import { CTAButton } from './CTAButton'
import { ScrollCue } from './ScrollCue'

export function HeroContent() {
  return (
    <div className="text-cream relative z-20 inline-block w-auto px-4 text-center">
      <h1 className="mb-0 pb-0 text-2xl font-extrabold tracking-[.1em] [word-spacing:20px] md:text-5xl">
        WELCOME TO
        <br />
        <span className="text-6xl font-black drop-shadow-xl md:text-[11rem]">
          AUCC
        </span>
      </h1>
      <div className="flex w-auto flex-row">
        <p className="mt-4 inline-block h-auto w-90 text-left text-base italic md:text-[20px]">
          Whitewater kayaking &amp; rafting in <br />
          New Zealand’s most beautiful places
        </p>
        <CTAButton />
      </div>
    </div>
  )
}
