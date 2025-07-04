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
        'font-unbounded flex items-center text-center align-middle text-[6px] text-white hover:underline xl:text-[10px]',
        classname,
      )}
    >
      {children}
    </Link>
  )
}
