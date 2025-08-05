import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SeeTripGuide() {
  return (
    <Link href="/resources">
      <button className="text-cream border-cream font-unbounded text-md flex items-center text-left text-sm">
        SEE TRIP GUIDE
        <ArrowRight />
      </button>
    </Link>
  )
}
