import React, { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

type NavButtonProps = {
  children: ReactNode
  href: string
  classname?: string
}

export function NavButton({ children, href, classname }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-unbounded flex items-center text-center align-middle text-sm text-white hover:underline',
        classname,
      )}
    >
      {children}
    </Link>
  )
}
