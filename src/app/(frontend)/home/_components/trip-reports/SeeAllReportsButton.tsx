import { ArrowRight } from 'lucide-react'

import Button from '@/components/Button'

export function SeeAllReportsButton() {
  return (
    <Button
      href="/trip-reports"
      intent="ghost"
      color="cream"
      className="text-md flex px-2 pt-3 pb-2 text-left md:place-self-end md:pt-6 md:text-sm"
    >
      SEE ALL REPORTS <ArrowRight />
    </Button>
  )
}
