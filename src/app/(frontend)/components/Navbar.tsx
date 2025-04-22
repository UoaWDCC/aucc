import React from 'react'
import Link from 'next/link'

import NavButton from './NavButton'

export default function Navbar() {
  return (
    <div className="flex w-full gap-10">
      <Link href="/">AUCC logo</Link>
      <div className="flex gap-5">
        <NavButton route="/about">About</NavButton>
        <NavButton route="/events">Events</NavButton>
        <NavButton route="/gallery">Gallery</NavButton>
        <NavButton route="/gear-hire">Gear Hire</NavButton>
        <NavButton route="/merchandise">Merchandise</NavButton>
        <NavButton route="/resources">Resources</NavButton>
        <NavButton route="/rivers">Rivers</NavButton>
        <NavButton route="/trip-reports">Trip Reports</NavButton>
      </div>
    </div>
  )
}
