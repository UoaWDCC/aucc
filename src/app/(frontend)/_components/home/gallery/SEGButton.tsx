import { ArrowRight } from 'lucide-react'

import Button from '@/components/Button'

export function SEGButton() {
  return (
    <Button intent="ghost" color="abyss" size="sm" href="/gallery">
      SEE ENTIRE GALLERY <ArrowRight />
    </Button>
  )
}
