import { ArrowLeft } from 'lucide-react'

import Button from '@/components/Button'

export function BackButton() {
  return (
    <Button
      href="/events"
      intent="ghost"
      color="cream"
      className="flex justify-start p-0"
    >
      <ArrowLeft />
      BACK
    </Button>
  )
}
