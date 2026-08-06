interface TripsCardSkeletonProps {
  bg?: 'abyss' | 'cream'
}

export function TripsCardSkeleton({ bg = 'abyss' }: TripsCardSkeletonProps) {
  const bgClass = bg === 'abyss' ? 'bg-abyss' : 'bg-cream'
  const pulseClass = bg === 'abyss' ? 'bg-cream/20' : 'bg-abyss/10'

  return (
    <div
      className={`${bgClass} relative flex flex-col-reverse justify-center gap-5 rounded-2xl px-5 py-9 md:flex-row md:gap-24 md:px-16 lg:mx-30`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-96">
          <div className={`h-6 w-2/3 animate-pulse rounded ${pulseClass}`} />
          <div className="flex flex-row gap-7">
            <div
              className={`h-6 w-16 animate-pulse rounded-full ${pulseClass}`}
            />
            <div className={`h-6 w-32 animate-pulse rounded ${pulseClass}`} />
          </div>
          <div className="flex flex-col gap-4">
            <div className={`h-4 w-full animate-pulse rounded ${pulseClass}`} />
            <div className={`h-4 w-5/6 animate-pulse rounded ${pulseClass}`} />
            <div className={`h-4 w-3/4 animate-pulse rounded ${pulseClass}`} />
            <div className={`h-4 w-1/2 animate-pulse rounded ${pulseClass}`} />
            <div className={`h-9 w-28 animate-pulse rounded ${pulseClass}`} />
          </div>
        </div>
      </div>
      <div
        className={`h-56 w-full animate-pulse rounded-xl md:h-64 md:w-80 ${pulseClass}`}
      />
    </div>
  )
}
