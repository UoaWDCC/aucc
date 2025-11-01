import { ReactNode } from 'react'

interface OtherInformationBackgroundProps {
  children?: ReactNode
}

export function OtherInformationBackground() {
  return (
    <div>
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1280 1176"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M1280 1176H0V0H1280V1176Z"
          fill="url(#paint0_linear_4155_422)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4155_422"
            x1="726"
            y1="224.202"
            x2="535.368"
            y2="891.452"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7F9F66" />
            <stop offset="1" stopColor="#1E2A29" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
