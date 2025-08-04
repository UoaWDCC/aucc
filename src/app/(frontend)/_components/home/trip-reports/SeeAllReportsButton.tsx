import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ReusableButton'

export function SeeAllReportsButton() {
  return (
    <Button
      href="/trip-reports"
      intent="ghost"
      color="cream"
      size="custom"
      className="text-md flex px-2 pt-3 pb-2 text-left md:place-self-end md:pt-6 md:text-sm"
    >
      SEE ALL REPORTS <ArrowRight />
    </Button>
  )
}
