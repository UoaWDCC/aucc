import { IntroBottomCurve } from './IntroBottomCurve'
import { IntroImage } from './IntroImage'

export function IntroSection() {
  return (
    <div className="relative flex h-[100vh] flex-col items-center justify-center align-middle">
      <IntroImage alt="IntroImage" />
      <div className="text-cream relative z-1">
        <h1 className="font-heading flex text-center text-[140px]">Events</h1>
        <h2 className="font-body -mt-5 w-80 pl-3 leading-5 tracking-tighter italic">
          From action-packed trips to small kayak training sessions - find our
          major events here.
        </h2>
      </div>
      <IntroBottomCurve />
    </div>
  )
}
