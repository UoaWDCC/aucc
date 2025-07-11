'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils/cn'

type SideButtonProps = {
  children: ReactNode
  href: string
  classname?: string
  setSideBarVisible: (value: boolean) => void
}

export function SideButton({
  children,
  href,
  classname,
  setSideBarVisible,
}: SideButtonProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        'font-unbounded hover:text-algae text-end text-3xl font-bold',
        pathname === href ? 'text-algae' : 'text-white',
        classname,
      )}
      onClick={() => {
        setSideBarVisible(false)
      }}
    >
      {children}
    </Link>
  )
}
