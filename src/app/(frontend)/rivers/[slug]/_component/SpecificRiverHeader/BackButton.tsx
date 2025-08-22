import { ArrowLeft } from 'lucide-react'

import Button from '@/components/Button'

export function BackButton() {
  return (
    <Button
      href="/rivers"
      intent="ghost"
      color="cream"
      className="absolute mt-20 ml-20 flex cursor-pointer justify-start"
    >
      <ArrowLeft />
      BACK
    </Button>
  )
}
