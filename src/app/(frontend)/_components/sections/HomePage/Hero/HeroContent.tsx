import { CTAButton } from '../../../ui/CTAButton';
import { ScrollCue } from '../../../ui/ScrollCue';

export function HeroContent() {
  return (
    <div className="relative z-20 text-center text-white px-4">
      <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide mb-2">
        WELCOME TO
        <br />
        <span className="text-6xl md:text-9xl font-black drop-shadow-xl">AUCC</span>
      </h1>
      <p className="mt-4 text-base md:text-xl italic opacity-90">
        Whitewater kayaking &amp; rafting in New Zealand’s most beautiful places.
      </p>
      <CTAButton />
      <ScrollCue />
    </div>
  );
}
