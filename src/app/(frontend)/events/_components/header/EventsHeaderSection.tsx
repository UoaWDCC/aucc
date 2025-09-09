import { EventsHeaderBottomCurve } from './EventsHeaderBottomCurve'
import { EventsHeaderImage } from './EventsHeaderImage'

export function EventsHeaderSection() {
  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center align-middle md:h-115">
      <EventsHeaderImage alt="IntroImage" />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[60px] md:text-[100px] lg:text-[140px]">
          Events
        </h1>
        <h2 className="font-body -mt-4 w-60 pl-2 text-center text-xs leading-5 font-light tracking-tighter italic md:-mt-10 md:w-80 md:pl-3 md:text-start md:text-base">
          From action-packed trips to small kayak training sessions - find our
          major events here.
        </h2>
      </div>
      <EventsHeaderBottomCurve />
    </div>
  )
}
