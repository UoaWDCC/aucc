export default function Loading() {
  return (
    <div className="p-4 text-center">
      <div className="mx-auto w-fit">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-6 w-64 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-6 space-y-2">
        <div className="h-4 w-72 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-60 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-56 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}
