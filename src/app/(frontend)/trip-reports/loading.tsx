import { TripReportsGridFallback } from './_components/TripReportsGridFallback'

export default function Loading() {
  return (
    <div className="p-4">
      <div>
        <div className="h-8 w-32 animate-pulse bg-gray-200" />
        <div className="mt-1 h-6 w-48 animate-pulse bg-gray-200" />
      </div>
      <div className="mt-4">
        <TripReportsGridFallback />
      </div>
    </div>
  )
}
