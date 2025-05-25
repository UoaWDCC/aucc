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
        className="fill-yellow-500"
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
      <div className="relative h-[100vh]">
        {/* Background Layer */}
        <section className="pointer-events-none absolute inset-0 z-0">
          <div className="h-full w-full bg-transparent">
            {/* <div className="h-[10vh] bg-transparent">
              <Curve />
            </div> */}
            <div className="bg-cream h-[50vh]" />
            <div className="bg-water h-[50vh]" />
          </div>
        </section>

        {/* Foreground Layer */}
        <section className="z-10 h-full w-full">{children}</section>
      </div>
    </>
  )
}
