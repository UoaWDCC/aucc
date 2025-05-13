export function EventPageFallback() {
  return (
    <div className="p-4">
      <div className="mx-auto h-6 w-1/2 animate-pulse rounded bg-gray-300" />
      <div className="mt-4 block border p-2">
        <div className="m-2 h-144 animate-pulse rounded bg-gray-200 p-2" />
        <div className="space-y-4 p-2">
          <div className="mx-auto h-30 w-full animate-pulse rounded bg-gray-200" />
          <div className="mx-auto h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto h-4 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
