import { env } from '@/lib/env'

export function IntroText() {
  return (
    <div
      className="flex w-full flex-col items-center px-4"
      // md:items-end md:pt-37 md:pr-46
    >
      <div className="mt-11 mb-27.5 flex flex-row justify-center">
        <h1 className="font-heading text-grass text-center text-4xl tracking-tighter">
          HEY THERE
        </h1>
        <span className="text-grass font-handwritten -mt-5 -rotate-7 text-start text-6xl font-bold tracking-tight">
          !
        </span>
      </div>

      <p className="text-algae font-body mb-4.5 max-h-17 max-w-130 min-w-77 text-center text-[28px] leading-8 font-bold tracking-tighter italic">
        We’re the Auckland University Canoe Club.
      </p>

      <div className="font-body w-full max-w-130 text-center text-sm leading-5 italic">
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
