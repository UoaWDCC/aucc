import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ReusableButton'

export function SEGButton() {
  return (
    // <Link href="/gallery" className="flex items-center justify-center">
    //   <button className="font-unbounded text-abyss flex cursor-pointer items-center justify-center gap-2 text-sm tracking-tighter">
    //     SEE ENTIRE GALLERY
    //     <ArrowRight />
    //   </button>
    // </Link>

    <Button intent="ghost" color="abyss" size="sm">
      SEE ENTIRE GALLERY <ArrowRight />
    </Button>
  )
}
