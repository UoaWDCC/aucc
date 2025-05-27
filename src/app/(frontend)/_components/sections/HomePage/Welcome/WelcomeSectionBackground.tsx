import { ReactNode } from 'react'

function Curve() {
  return (
    <svg
      width="375"
      height="552"
      viewBox="0 0 375 55"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full bg-transparent"
      preserveAspectRatio="none"
    >
      <path
        d="M380 17.5801C286.277 -47.59 139.024 95.1834 0 17.5801V552H380V17.5801Z"
        className="fill-cream"
      />
    </svg>
  )
}
export function WelcomeSectionBackground() {
  return (
    <div className="absolute inset-0 h-235 w-full bg-transparent md:h-197.5">
      <div className="absolute -top-20 left-0 h-20.5 w-[101%]">
        <Curve />
      </div>
      <div className="bg-cream h-167.5 md:h-122.5" />
      <div className="bg-water h-67.5 md:h-75" />
    </div>
  )
}
