import { env } from '@/lib/env'

export function IntroText() {
  return (
    <div
      className="flex w-full flex-col items-center px-4"
      // md:items-end md:pt-37 md:pr-46
    >
      <div className="mt-11 mb-27.5 flex flex-row justify-center">
        <div className="font-heading text-grass w-[277px] text-center text-4xl tracking-tighter">
          HEY THERE
        </div>
        <div
          className="text-grass font-handwritten -mt-7 -ml-1 -rotate-7 text-start text-6xl font-bold tracking-tight"
          // md:-mt-5 md:ml-0 md:-rotate-2    -Scrapped breakpoint code, consider breakpoint after design done
        >
          !
        </div>
      </div>

      <div
        className="text-algae font-body mb-4.5 max-h-17 max-w-130 min-w-77 text-center text-[28px] leading-8 font-bold tracking-tighter italic"
        // md:mb-9 md:w-[50%] md:text-right md:text-[26px]    -Scrapped breakpoint code, consider breakpoint after design done
      >
        We’re the Auckland University Canoe Club.
      </div>

      <div
        className="font-body w-full max-w-130 text-center text-sm leading-5 italic"
        // md:w-[calc(70%-184px)] md:text-right   -Scrapped breakpoint code, consider breakpoint after design done
      >
        AUCC offers whitewater kayaking and rafting adventures for all skill
        levels. Many of our new members have never touched a paddle, however our
        weekly pool trainings and beginner trips quickly develop their
        skills. For those with more experience the club also offers the
        opportunity to paddle more challenging rivers and rub shoulders with
        some of New Zealand&apos;s top kayakers.
      </div>
    </div>
  )
}
