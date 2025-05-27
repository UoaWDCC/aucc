import { CTAButton } from './CTAButton'
import { ScrollCue } from './ScrollCue'

export function HeroContent() {
  return (
    <div className="text-cream relative z-20 inline-block w-auto px-4 text-center">
      <h1 className="mb-2 text-2xl font-extrabold tracking-[.2em] md:text-4xl">
        WELCOME TO
        <br />
        <span className="text-6xl font-black drop-shadow-xl md:text-[11rem]">
          AUCC
        </span>
      </h1>
      <div className="w-auto flex-row">
        <p className="mt-4 inline-block h-auto w-90 text-left text-base italic md:text-xl">
          Whitewater kayaking &amp; rafting in New Zealand’s most beautiful
          places.
        </p>
        <CTAButton />
      </div>
      <ScrollCue /> {/* Replace with styled cue later */}
    </div>
  )
}
