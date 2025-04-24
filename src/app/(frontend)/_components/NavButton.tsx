import React, { ReactNode } from 'react'
import Link from 'next/link'

type NavButtonProps = {
  children: ReactNode
  href: string
}

export function NavButton({ children, href }: NavButtonProps) {
  return <Link href={href}>{children}</Link>
}
