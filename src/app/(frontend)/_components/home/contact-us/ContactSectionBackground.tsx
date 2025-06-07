import { ReactNode } from 'react'

interface ContactSectionBackGroundProps {
  children?: ReactNode
}

export function ContactSectionBackground({
  children,
}: ContactSectionBackGroundProps) {
  return <div className="relative inset-0 w-full">{children}</div>
}
