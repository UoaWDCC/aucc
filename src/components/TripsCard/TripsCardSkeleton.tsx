type TripsCardSkeletonProps = {
  mode: 'upcoming' | 'past'
  bg: 'cream' | 'abyss'
}

export function TripsCardSkeleton({ mode, bg }: TripsCardSkeletonProps) {
  const bgClass = bg === 'abyss' ? 'bg-abyss' : 'bg-cream/5'
  const flexDirection =
    mode === 'upcoming' ? 'md:flex-row' : 'md:flex-row-reverse'
  const pulseClass = bg === 'abyss' ? 'bg-cream/20' : 'bg-cream/10'

  return (
    <div
      className={`${bgClass} mx-auto flex max-w-6xl flex-col-reverse justify-between gap-5 rounded-2xl px-16 py-9 ${flexDirection} md:gap-24 lg:min-w-6xl`}
    >
      <div className="w-full md:w-96">
        <div className="flex flex-col-reverse gap-6">
          <div className={`h-6 w-2/3 animate-pulse rounded ${pulseClass}`} />
          <div className="flex flex-row gap-7">
            <div
              className={`h-6 w-16 animate-pulse rounded-full ${pulseClass}`}
            />
            <div className={`h-6 w-32 animate-pulse rounded ${pulseClass}`} />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div className={`h-4 w-full animate-pulse rounded ${pulseClass}`} />
          <div className={`h-4 w-5/6 animate-pulse rounded ${pulseClass}`} />
          <div className={`h-4 w-3/4 animate-pulse rounded ${pulseClass}`} />
          <div className={`h-4 w-1/2 animate-pulse rounded ${pulseClass}`} />
          {mode === 'upcoming' && (
            <div className={`h-9 w-28 animate-pulse rounded ${pulseClass}`} />
          )}
        </div>
      </div>
      <div
        className={`h-56 w-full animate-pulse rounded-xl md:h-64 md:w-80 ${pulseClass}`}
      />
    </div>
  )
}
