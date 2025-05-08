'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <p>Error:</p>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
