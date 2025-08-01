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
    <div className="flex w-full flex-col items-start px-12 pt-20 md:pt-20 md:pl-[10%] xl:pt-32 xl:pl-28">
      <div className="flex flex-col gap-6">
        {/* Title Container (Flare 기준 anchor) */}
        <div className="relative w-fit">
          <FlareIcon className="text-grass absolute -top-3 right-[-20px] z-10 scale-x-[-1] md:-top-4 md:-right-4" />
          <h1 className="font-heading text-grass text-left text-3xl tracking-tighter md:text-4xl xl:text-5xl">
            UPCOMING TRIPS
          </h1>
        </div>

        {/* Info */}
        <p className="font-body max-w-sm text-sm leading-6 text-gray-800 italic">
          Here you&apos;ll find information on our major events for the year
          ranging from action-packed trips to small kayak training sessions.
          Updated information on upcoming trips will be circulated on the email
          list and our social media pages. Check out previous events on our{' '}
          <Link
            href="/trip-reports"
            className="text-grass underline hover:text-[#475A30]"
          >
            Trip Reports
          </Link>{' '}
          page.
        </p>
      </div>
    </div>
  )
}
