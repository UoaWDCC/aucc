import { ReactNode } from 'react'

function Curve() {
  return (
    <svg
      width="375"
      height="552"
      viewBox="0 0 375 55"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full bg-transparent"
      preserveAspectRatio="none"
    >
      <path
        d="M380 17.5801C286.277 -47.59 139.024 95.1834 0 17.5801V552H380V17.5801Z"
        className="fill-yellow-500" // Set to yellow temporarily so it can be seen
        // className="fill-cream"
      />
    </svg>
  )
}

type WelcomeSectionBackgroundProps = {
  children?: ReactNode
}

export function WelcomeSectionBackground({
  children,
}: WelcomeSectionBackgroundProps) {
  return (
    <>
      <div className="relative">
        {/* Background Layer */}
        <div className="pointer-events-none absolute inset-0 -z-1">
          <div className="h-full w-full bg-transparent">
            <div className="absolute -top-20 h-20 w-full bg-transparent">
              <Curve />
            </div>
            <div className="bg-cream h-167.5 md:h-122.5" />
            <div className="bg-water h-67.5 md:h-75" />
          </div>
        </div>

        {/* Foreground Layer */}
        <section className="z-1 h-full w-full">{children}</section>
      </div>
    </>
  )
}
