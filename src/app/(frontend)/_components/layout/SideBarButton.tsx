import React, { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

type SideBarButtonProps = {
  children: ReactNode
  href: string
  classname?: string
  onClick?: () => void
}

export function SideBarButton({
  children,
  href,
  classname,
  onClick,
}: SideBarButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-unbounded hover:text-algae text-end text-3xl font-bold',
        classname,
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
