import Link from 'next/link'

/** icon on the title */
function FlareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="30"
      height="83"
      viewBox="0 0 27 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-current ${className}`}
    >
      <path
        d="M25.3742 9.15649C24.1801 7.41013 24.0727 5.10787 22.7908 3.42981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13.1833 15.282C11.4206 15.0116 10.0856 13.6039 8.66617 12.6587C7.89977 12.1484 6.41536 11.5567 6.10571 10.6427"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2.46411 28.7404L8.49955 29.6662"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function UpcomingText() {
  return (
    <div className="flex w-full flex-col items-center px-4 pt-20 text-center md:items-start md:px-12 md:pl-[10%] md:text-left xl:pl-28">
      {/* Title Container */}
      <div className="relative w-fit">
        <FlareIcon className="text-grass absolute -top-3 left-[-16px] z-10 md:-top-4 md:-right-6 md:left-auto md:scale-x-[-1]" />
        <h1 className="font-heading text-grass text-3xl tracking-tighter md:text-4xl xl:text-5xl">
          UPCOMING TRIPS
        </h1>
      </div>

      {/* Info */}
      <div className="mt-6 w-full max-w-[95%] md:max-w-[502px]">
        <p className="font-body text-bold text-sm leading-6 text-gray-800 italic">
          Here you&apos;ll find information on our major events for the year
          ranging from action-packed trips to small kayak training sessions.
          Updated information on upcoming trips will be circulated on the email
          list and our social media pages. Check out previous events on our{' '}
          <Link href="/trip-reports" className="underline hover:text-[#475A30]">
            Trip Reports
          </Link>{' '}
          page.
        </p>
      </div>
    </div>
  )
}
