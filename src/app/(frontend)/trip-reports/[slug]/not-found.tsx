import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="m-20 w-auto bg-gray-100 p-15 text-center">
      <div className="pb-10 text-3xl font-bold">Trip Report Not Found!</div>
      <Link href="/trip-reports">Return to trip reports ...</Link>
    </div>
  )
}
