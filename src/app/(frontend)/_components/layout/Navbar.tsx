'use client'

import Link from 'next/link'

import { Logo } from '@/assets/Logo'
import { NavButton } from './NavButton'

function NavCurve() {
  return (
    <>
      <svg
        viewBox="1 0 374 66"
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
        viewBox="1 0 1279 80"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute hidden h-full w-320 md:block xl:w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M1280 64.6248C1198.04 53.8132 1079.11 38.9951 913.004 54.9998C807.004 65.2132 933.105 25.6348 703.601 47.4119C272.167 88.3494 370.418 18.0063 0 59.9333V-0.000244141H1280V64.6248Z"
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
      <div className="absolute -z-10 flex h-15 w-full justify-end overflow-hidden align-baseline md:h-25">
        <NavCurve />
      </div>
      <div className="w-13www -z-9 mr-auto h-14 w-14">
        <Logo />
      </div>
      <div className="mt-0 mr-6 hidden gap-5 md:flex xl:gap-7">
        <NavButton href="/">Home</NavButton>
        <NavButton href="/events">Events</NavButton>
        <NavButton href="/about">About</NavButton>
        <NavButton
          href="https://form.jotform.com/250418674375867?fbclid=PAZXh0bgNhZW0CMTEAAaeWIjTTV9xmRZdfLddy8HFmM9hUlfwNq9s9cwQ25cArwsCTzYgQgbH-2bx3Pw_aem_0HuEKOXK5sj-2w6iUQDzWA"
          classname="font-semibold"
        >
          Sign Up
        </NavButton>
      </div>
      <div className="mt-3 mr-3 h-8 w-8">
        <HamburgerIcon />
      </div>
    </div>
  )
}
