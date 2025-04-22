import Link from 'next/link'

import NavButton from './NavButton'

export default function Navbar() {
  return (
    <div className="flex gap-5">
      <NavButton route="/about">About</NavButton>
      <NavButton route="/events">Events</NavButton>
      <NavButton route="/gallery">Gallery</NavButton>
      <NavButton route="/gear-hire">Gear Hire</NavButton>
      <NavButton route="/merchandise">Merchandise</NavButton>
      <NavButton route="/resources">Resources</NavButton>
      <NavButton route="/rivers">Rivers</NavButton>
      <NavButton route="/trip-reports">Trip Reports</NavButton>
      <Link
        href="https://form.jotform.com/250418674375867?fbclid=PAZXh0bgNhZW0CMTEAAaeWIjTTV9xmRZdfLddy8HFmM9hUlfwNq9s9cwQ25cArwsCTzYgQgbH-2bx3Pw_aem_0HuEKOXK5sj-2w6iUQDzWA"
        target="_blank"
      >
        Sign Up
      </Link>
    </div>
  )
}
