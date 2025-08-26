import { ArrowLeft } from 'lucide-react'

import Button from '@/components/Button'

export function BackButton() {
  return (
    <Button
      href="/rivers"
      intent="ghost"
      color="cream"
      className="absolute mt-12 flex cursor-pointer justify-start md:mt-24 md:ml-20"
    >
      <ArrowLeft />
      BACK
    </Button>
  )
}
