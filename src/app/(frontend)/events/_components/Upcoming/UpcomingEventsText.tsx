export function UpcomingText() {
  return (
    <div className="flex w-full flex-col items-center px-4 md:items-end md:pt-12 md:pr-[14%] xl:pt-31">
      <div className="mt-11 mb-27.5 flex flex-row justify-center md:mb-2 xl:mr-6">
        <h1 className="font-heading text-grass text-center text-3xl tracking-tighter md:text-3xl xl:text-5xl">
          UPCOMING TRIPS
        </h1>
        <span className="text-grass font-handwritten -mt-5 -rotate-7 text-start text-6xl font-bold tracking-tight md:-mt-3 md:text-5xl xl:-mt-5 xl:text-[80px]">
          !
        </span>
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
