import { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

type SideBarButtonProps = {
  children: ReactNode
  href: string
  classname?: string
  onClick?: () => void
  /** True when this link is the page being viewed. */
  current?: boolean
}

export function SideBarButton({
  children,
  href,
  classname,
  onClick,
  current,
}: SideBarButtonProps) {
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
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
