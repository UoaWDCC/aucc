export function ExecsGridFallback() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border p-2">
          <div className="h-48 animate-pulse bg-gray-200" />
          <div className="mt-2">
            <div className="mr-auto ml-auto h-5 w-2/3 bg-gray-200" />
            <div className="mt-1 mr-auto ml-auto h-4 w-1/3 animate-pulse bg-gray-200" />
            <div className="mt-1 mr-auto ml-auto h-4 w-1/2 animate-pulse bg-gray-200" />
            <div className="mt-1 mr-auto ml-auto h-4 w-3/5 animate-pulse bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
