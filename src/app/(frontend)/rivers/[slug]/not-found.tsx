import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <div>River not found.</div>
      <Link href="/rivers">Return to Rivers</Link>
    </div>
  )
}
