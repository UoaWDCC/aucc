export function TripReportsGridFallback() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="h-48 animate-pulse rounded-md bg-gray-200"
        ></div>
      ))}
    </div>
  )
}
