import { ReactNode } from 'react'

import { env } from '@/lib/env'

function AgendaArrow() {
  return (
    <svg
      width="55"
      height="119"
      viewBox="0 0 55 119"
      className="rotate-15 fill-none md:rotate-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43 116.507C45.1127 116.507 47.2253 116.507 49.338 116.507C49.9702 116.507 53.4794 117.029 52.8151 116.199C51.8539 114.997 51.7224 112.921 51.2306 111.445C50.9266 110.533 50.8538 107.362 50.1303 107"
        className="stroke-cream stroke-3"
        strokeLinecap="round"
      />
      <path
        d="M26 2C13.3023 9.5 4.5 18 2.00392 30.5C2.00326 36.7922 1.69822 49.1798 6.61158 53.884C18.4758 65.2434 50.6201 54.2452 29.0665 38.3143C19.1198 30.9624 15.5747 39.7572 11.6189 43.5563C4.38914 50.5 2.98354 77.5816 8.8023 86.8231C14.6211 96.0647 22.963 103.371 32.7438 108.261C36.9775 110.378 49.2235 112.428 51.0519 116.085"
        className="stroke-cream stroke-3"
        strokeLinecap="round"
      />
    </svg>
  )
}
export function WelcomeSection() {
  const imageURLs = [
    `${env.NEXT_PUBLIC_CF_UR}/static/homepage/welcome-01.v1.webp`,
    `${env.NEXT_PUBLIC_CF_UR}/static/homepage/welcome-02.v1.webp`,
    `${env.NEXT_PUBLIC_CF_UR}/static/homepage/welcome-03.v1.webp`,
  ]
  const paddleURL = `${env.NEXT_PUBLIC_CF_UR}/static/homepage/paddle.v1.webp`
  return (
    <>
      <div className="relative h-235 md:h-197.5">
        {/* Text Section */}
        <div className="flex flex-col items-center">
          <div className="mt-11 mb-27.5 flex w-full flex-row justify-center">
            <div className="font-heading text-grass w-[277px] text-center text-4xl tracking-tighter">
              HEY THERE
            </div>
            <div className="text-grass font-handwritten -mt-7 -ml-1 -rotate-7 text-start text-6xl font-bold tracking-tight">
              !
            </div>
          </div>

          {/* Paddle */}
          <img
            src={paddleURL}
            className="absolute top-20 -left-9 w-75 rotate-7"
          ></img>

          <div className="text-algae font-body mb-4.5 h-[67px] w-[307px] text-center text-[28px] leading-8 font-bold tracking-tighter italic md:text-[26px]">
            We’re the Auckland University Canoe Club.
          </div>

          <div className="font-body w-[265px] text-center text-sm leading-5 italic md:w-130 md:text-right">
            AUCC offers whitewater kayaking and rafting adventures for all skill
            levels. Many of our new members have never touched a paddle,
            however our weekly pool trainings and beginner trips quickly develop
            their skills. For those with more experience the club also offers
            the opportunity to paddle more challenging rivers and rub shoulders
            with some of New Zealand&apos;s top kayakers.
          </div>
        </div>

        {/* Image Section */}
        <>
          <img
            className="absolute top-140 -left-4 h-43.5 w-54 rounded-2xl md:top-29 md:h-73.5 md:w-92"
            src={imageURLs && imageURLs[0]}
          ></img>
          <img
            className="absolute top-187 right-30 z-2 h-25 w-20.5 rounded-2xl"
            src={imageURLs && imageURLs[1]}
          ></img>
          <img
            className="absolute top-160 right-4 z-1 h-43 w-28 rounded-2xl"
            src={imageURLs && imageURLs[2]}
          ></img>
        </>

        {/* Agenda Section */}
        <div className="absolute bottom-9.5 left-12 flex flex-row tracking-tighter">
          <AgendaArrow />
          <div className="font-handwritten text-cream absolute top-21 left-11 w-36 rotate-10 text-[20px]">
            what’s on the agenda?
          </div>
        </div>
      </div>
    </>
  )
}
