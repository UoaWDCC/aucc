'use client'

import Link from 'next/link'

import { Logo } from '@/assets/Logo'
import { NavButton } from './NavButton'

function NavCurve() {
  return (
    <>
      <svg
        viewBox="1 0 375 66"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-full w-full md:hidden"
        preserveAspectRatio="none"
      >
        <path
          d="M375 63.3311C357.772 59.8648 332.131 58.8661 293.561 64.5107C237.345 72.7376 310.356 37.1973 173.911 58.79C80.0594 73.6422 52.0108 59.4655 0 57.2441V0H375V63.3311Z"
          fill="#182821"
          className="fill-[#182821] stroke-white opacity-[0.3]"
        />
      </svg>
      <svg
        viewBox="1 0 1280 80"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute hidden h-full w-full md:block"
        preserveAspectRatio="none"
      >
        <path
          d="M1280 79.666C1267.74 75.1402 1234.46 24.0407 991.902 47.4121C853.899 60.7091 1033.92 0.0675391 698.907 35.1768C350.177 71.7237 372.823 -4.90514 0 47.3125V0H1280V79.666Z"
          fill="#182821"
          className="fill-[#182821] stroke-white opacity-[0.3]"
        />
      </svg>
    </>
  )
}

function HamburgerIcon() {
  return (
    <svg
      viewBox="0 0 31 31"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <path
        d="M3.875 23.25V20.6667H27.125V23.25H3.875ZM3.875 16.7917V14.2083H27.125V16.7917H3.875ZM3.875 10.3333V7.75H27.125V10.3333H3.875Z"
        fill="white"
      />
    </svg>
  )
}

export function Navbar() {
  return (
    <div className="fixed z-100 flex w-full justify-end">
      <div className="absolute -z-10 h-21 w-full md:h-12 xl:h-21">
        <NavCurve />
      </div>
      <div className="-z-9 mr-auto h-11 w-11 md:h-6 md:w-6 xl:h-10 xl:w-10">
        <Logo />
      </div>
      <div className="mt-1 mr-4 hidden gap-4 md:flex xl:mt-0 xl:mr-5 xl:gap-6">
        <NavButton href="/">Home</NavButton>
        <NavButton href="/events">Events</NavButton>
        <NavButton href="/about">About</NavButton>
        <NavButton
          href="https://form.jotform.com/250418674375867?fbclid=PAZXh0bgNhZW0CMTEAAaeWIjTTV9xmRZdfLddy8HFmM9hUlfwNq9s9cwQ25cArwsCTzYgQgbH-2bx3Pw_aem_0HuEKOXK5sj-2w6iUQDzWA"
          classname="font-bold"
        >
          Sign Up
        </NavButton>
      </div>
      <div className="mt-5 mr-4 h-8 w-8 md:mt-2 md:mr-3 md:h-4 md:w-4 xl:mr-4 xl:h-8 xl:w-8">
        <HamburgerIcon />
      </div>
    </div>
  )
}
