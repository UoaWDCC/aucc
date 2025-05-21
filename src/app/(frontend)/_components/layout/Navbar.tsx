import Link from 'next/link'

import { NavButton } from './NavButton'

export function Navbar() {
  return (
    <div className="flex gap-5">
      <NavButton href="/">Home</NavButton>
      <NavButton href="/about">About</NavButton>
      <NavButton href="/events">Events</NavButton>
      <NavButton href="/gallery">Gallery</NavButton>
      <NavButton href="/gear-hire">Gear Hire</NavButton>
      <NavButton href="/merchandise">Merchandise</NavButton>
      <NavButton href="/resources">Resources</NavButton>
      <NavButton href="/rivers">Rivers</NavButton>
      <NavButton href="/trip-reports">Trip Reports</NavButton>
      <Link
        href="https://form.jotform.com/250418674375867?fbclid=PAZXh0bgNhZW0CMTEAAaeWIjTTV9xmRZdfLddy8HFmM9hUlfwNq9s9cwQ25cArwsCTzYgQgbH-2bx3Pw_aem_0HuEKOXK5sj-2w6iUQDzWA"
        target="_blank"
      >
        Sign Up
      </Link>
    </div>
  )
}
