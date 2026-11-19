import { ReactNode } from 'react'

interface UsefulLinksBackgroundProps {
  children?: ReactNode
}

export function UsefulLinksBackground({
  children,
}: UsefulLinksBackgroundProps) {
  return (
    <div className="bg-water relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[35%] bg-[#d3e2da]" />
      <svg
        viewBox="0 0 1280 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-x-0 top-[35%] h-16 w-full -translate-y-px fill-[#d3e2da] md:h-24"
        preserveAspectRatio="none"
      >
        <path d="M0 0H1280V10C1000 50 600 110 0 60Z" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  )
}
