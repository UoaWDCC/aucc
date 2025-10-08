export function RiversGridFallback() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border p-2">
          <div className="h-48 animate-pulse bg-gray-200" />
          <div className="mt-2">
            <div className="h-5 w-2/3 bg-gray-200" />
            <div className="mt-1 h-4 w-1/3 animate-pulse bg-gray-200" />
            <div className="mt-1 h-4 w-full animate-pulse bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
