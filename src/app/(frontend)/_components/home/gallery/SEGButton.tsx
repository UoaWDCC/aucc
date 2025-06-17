import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SEGButton() {
  return (
    <Link
      href="/gallery"
      className="flex items-center justify-center pt-8 pb-16"
    >
      <button className="font-unbounded text-abyss flex items-center justify-center gap-2 text-sm tracking-tighter">
        SEE ENTIRE GALLERY
        <ArrowRight />
      </button>
    </Link>
  )
}
