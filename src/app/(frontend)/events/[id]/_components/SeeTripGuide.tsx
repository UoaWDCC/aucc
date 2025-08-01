import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SeeAllGuide() {
  return (
    <Link href="/resources">
      <button className="text-cream border-cream font-unbounded text-md flex items-center text-left text-sm">
        SEE ALL GUIDE
        <ArrowRight />
      </button>
    </Link>
  )
}
