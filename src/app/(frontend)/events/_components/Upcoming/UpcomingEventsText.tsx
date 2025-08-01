// UpcomingText.tsx

function FlareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="27"
      height="80"
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
    <div className="flex w-full flex-col items-center px-4 md:items-start md:pt-12 md:pr-[14%] xl:pt-31">
      <div className="relative mt-11 mb-27.5 flex flex-row justify-center md:mb-2 xl:mr-6">
        <h1 className="font-heading text-grass relative text-center text-3xl tracking-tighter md:text-3xl xl:text-5xl">
          UPCOMING TRIPS
          <FlareIcon className="absolute -top-4 -left-6 z-10" />
        </h1>
      </div>

      <div className="font-body w-full max-w-130 text-center text-sm leading-5 italic md:max-w-93 md:text-end md:text-[10px] md:leading-4 xl:max-w-130 xl:text-sm xl:leading-5">
        Here you&apos;ll find information on our major events for the year
        ranging from action-packed trips to small kayak training
        sessions. Updated information on upcoming trips will be circulated on
        the email list and our social media pages. Check out previous events on
        our Trip Reports page.
      </div>
    </div>
  )
}
