export function NextAdventureFallback() {
  return (
    <div className="p-4 pt-0 md:px-24">
      <div className="bg-cream/5 text-cream flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-4 md:flex-row-reverse md:pr-5 md:pb-7 lg:pr-9 lg:pb-11 xl:mx-auto xl:max-w-[953px]">
        <div className="h-[192px] w-[302px] rounded-md bg-gray-400" />
        <div className="flex justify-center md:w-full">
          <h1 className="font-heading text-center text-xl md:text-2xl lg:text-3xl">
            No Upcoming Events
          </h1>
        </div>
      </div>
    </div>
  )
}
