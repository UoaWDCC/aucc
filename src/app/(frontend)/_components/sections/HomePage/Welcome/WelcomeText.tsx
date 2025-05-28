import { env } from '@/lib/env'

export function WelcomeText() {
  const paddleURL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/paddle.v1.webp`
  return (
    <div className="flex flex-col items-center">
      <div className="mt-11 mb-27.5 flex w-full flex-row justify-center">
        <div className="font-heading text-grass w-[277px] text-center text-4xl tracking-tighter">
          HEY THERE
        </div>
        <div className="text-grass font-handwritten -mt-7 -ml-1 -rotate-7 text-start text-6xl font-bold tracking-tight">
          !
        </div>
      </div>

      <img
        src={paddleURL}
        className="absolute top-20 -left-9 w-75 rotate-7"
      ></img>

      <div className="text-algae font-body mb-4.5 h-[67px] w-[307px] text-center text-[28px] leading-8 font-bold tracking-tighter italic md:text-[26px]">
        We’re the Auckland University Canoe Club.
      </div>

      <div className="font-body w-[265px] text-center text-sm leading-5 italic md:w-130 md:text-right">
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
