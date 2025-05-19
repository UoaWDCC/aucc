import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div>Event not found.</div>
      <Link href="/events">Return to Events</Link>
    </div>
  )
}
