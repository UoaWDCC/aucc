import { env } from '@/lib/env'

export function IntroText() {
  return (
    <div className="flex w-full flex-col items-center px-4 md:items-end md:pt-12 md:pr-[14%] xl:pt-31">
      <div className="mt-11 mb-27.5 flex flex-row justify-center md:mb-2 xl:mr-6">
        <h1 className="font-heading text-grass text-center text-3xl tracking-tighter md:text-3xl xl:text-5xl">
          HEY THERE
        </h1>
        <span className="text-grass font-handwritten -mt-5 -rotate-7 text-start text-6xl font-bold tracking-tight md:-mt-3 md:text-5xl xl:-mt-5 xl:text-[80px]">
          !
        </span>
      </div>

      <p className="text-algae font-body mb-4 max-h-17 max-w-130 min-w-77 text-center text-[28px] leading-8 font-bold tracking-tighter italic md:mb-5 md:text-end md:text-base xl:mr-2 xl:mb-9 xl:max-w-134 xl:text-[26px]">
        We’re the Auckland University Canoe Club.
      </p>

      <div className="font-body w-full max-w-130 text-center text-sm leading-5 italic md:max-w-93 md:text-end md:text-[10px] md:leading-4 xl:max-w-130 xl:text-sm xl:leading-5">
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
