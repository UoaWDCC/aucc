import { ReactNode } from 'react'

interface UsefulLinksBackgroundProps {
  children?: ReactNode
}

export function UsefulLinksBackground({
  children,
}: UsefulLinksBackgroundProps) {
  return <div className="relative inset-0 w-full bg-[#d3e2da]">{children}</div>
}
