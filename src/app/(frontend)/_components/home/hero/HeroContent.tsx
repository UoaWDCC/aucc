import { CTAButton } from './CTAButton'
import { ScrollCue } from './ScrollCue'

export function HeroContent() {
  return (
    <div className="relative z-20 px-4 text-center text-white">
      <h1 className="mb-2 text-2xl font-extrabold tracking-wide md:text-4xl">
        WELCOME TO
        <br />
        <span className="text-6xl font-black drop-shadow-xl md:text-9xl">
          AUCC
        </span>
      </h1>
      <p className="mt-4 text-base italic opacity-90 md:text-xl">
        Whitewater kayaking &amp; rafting in New Zealand’s most beautiful
        places.
      </p>
      <CTAButton />
      <ScrollCue />
    </div>
  )
}
