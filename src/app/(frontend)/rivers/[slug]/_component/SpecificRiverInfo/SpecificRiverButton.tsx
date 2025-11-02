import { ArrowRight } from 'lucide-react'

import Button from '@/components/Button'

export function SeeAllButton() {
  return (
    <Button intent="ghost" color="cream" size="sm" href="/trip-reports">
      SEE ALL <ArrowRight />
    </Button>
  )
}
