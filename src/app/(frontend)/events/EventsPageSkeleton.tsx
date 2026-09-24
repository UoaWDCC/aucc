import { TripsCardSkeleton } from '@/components/TripsCard/TripsCardSkeleton'

export function EventsPageSkeleton() {
  return (
    <>
      {/* EventsHeaderSection placeholder */}
      <div className="h-64 w-full animate-pulse bg-gray-200 sm:h-80 md:h-96" />

      {/* UpcomingSection (intro / petrol costs) placeholder */}
      <div className="mx-auto max-w-3xl space-y-3 px-6 py-10">
        <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
      </div>

      {/* UpcomingTripsSection placeholder — matches UpcomingTripsSectionBackground */}
      <div className="bg-water relative flex min-h-[800px] w-full items-center justify-center py-20">
        <div className="relative z-10 flex w-full flex-col gap-5 px-5">
          <div className="flex flex-col items-center justify-center gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <TripsCardSkeleton
                key={`upcoming-${i}`}
                mode="upcoming"
                bg="abyss"
              />
            ))}
          </div>
        </div>
      </div>

      {/* PastTripsSection placeholder */}
      <div className="bg-abyss my-31 h-auto w-full">
        <div className="mb-8 flex w-full items-center px-6">
          <div className="bg-cream/20 h-8 w-64 animate-pulse rounded" />
        </div>
        <div className="mb-45 flex flex-col gap-10">
          {Array.from({ length: 2 }).map((_, i) => (
            <TripsCardSkeleton key={`past-${i}`} mode="past" bg="cream" />
          ))}
        </div>
      </div>
    </>
  )
}
