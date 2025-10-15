import React, { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

type NavButtonProps = {
  children: ReactNode
  href: string
  className?: string
}

export function NavButton({ children, href, className }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-unbounded flex items-center text-center align-middle text-xs text-white transition-colors duration-200 hover:underline sm:text-sm',
        className,
      )}
    >
      {children}
    </Link>
  )
}
