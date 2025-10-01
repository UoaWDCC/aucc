export function TripReportsGridFallback() {
  return (
    <>
      <div className="h-80 max-w-200 py-20 md:mx-auto md:h-150">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              {/* Mobile: Horizontal layout */}
              <div className="flex h-24 w-full animate-pulse flex-row gap-4 rounded-lg bg-gray-200 md:hidden" />

              {/* Desktop: Vertical layout */}
              <div className="hidden h-120 animate-pulse rounded-lg bg-gray-200 md:flex md:flex-col" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
