import { IntroBottomCurve } from './IntroBottomCurve'
import { IntroImage } from './IntroImage'

export function IntroSection() {
  return (
    <div className="relative flex min-h-[calc(100dvh+56px)] flex-col items-center justify-center align-middle md:min-h-[calc(100dvh+0.09*100dvw)]">
      <IntroImage alt="IntroImage" />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[60px] md:text-[140px]">
          Events
        </h1>
        <h2 className="font-body -mt-4 w-60 pl-2 text-center text-xs leading-5 tracking-tighter italic md:-mt-10 md:w-80 md:pl-3 md:text-start md:text-base">
          From action-packed trips to small kayak training sessions - find our
          major events here.
        </h2>
      </div>
      <IntroBottomCurve />
    </div>
  )
}
