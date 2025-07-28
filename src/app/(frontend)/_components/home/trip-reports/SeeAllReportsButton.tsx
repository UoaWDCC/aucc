import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SeeAllReportsButton() {
  return (
    <Link href="/trip-reports">
      <button className="text-cream border-cream font-unbounded text-md flex items-center px-2 pt-3 pb-2 text-left md:place-self-end md:pt-6 md:text-sm">
        SEE ALL REPORTS
        <ArrowRight />
      </button>
    </Link>
  )
}
