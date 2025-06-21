import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SARButton() {
  return (
    <Link href="/trip-reports">
      <button className="text-cream border-cream font-unbounded text-md flex items-center px-2 pt-3 pb-2 text-left">
        SEE ALL REPORTS
        <ArrowRight />
      </button>
    </Link>
  )
}
