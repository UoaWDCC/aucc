import { CTAButton } from './CTAButton'

export function HeroContent() {
  return (
    <div className="text-cream relative z-1 inline-block -translate-y-20 text-center">
      <h1 className="font-heading text-[30px] leading-none md:text-[40px]">
        WELCOME TO
        <br />
        <span className="font-heading text-[90px] drop-shadow-xl md:text-[140px]">
          AUCC
        </span>
      </h1>
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <h2 className="leading-tighter text-base italic md:text-left">
          Whitewater kayaking &amp; rafting <br />
          in New Zealand’s most beautiful places
        </h2>
        <CTAButton />
      </div>
    </div>
  )
}
