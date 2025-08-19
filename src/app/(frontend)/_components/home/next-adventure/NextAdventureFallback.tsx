import { Image as ImageIcon } from 'lucide-react'

export function NextAdventureFallback() {
  return (
    <div className="p-4 pt-0 md:px-20 lg:px-28">
      <div className="bg-cream/5 text-cream flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-4 md:flex-row-reverse md:px-9 md:pb-7 lg:px-14 lg:pb-11 xl:mx-auto xl:max-w-[953px]">
        <div className="relative aspect-[302/192] h-[192px] w-[min(100%,302px)] flex-shrink-0 overflow-hidden rounded-md md:aspect-[195/164] md:h-[164px] md:w-[195px] lg:aspect-[325/274] lg:h-[274px] lg:w-[325px]">
          <div className="bg-cream/10 flex h-full w-full items-center justify-center">
            <div className="text-cream/50 flex flex-col items-center gap-2">
              <ImageIcon className="h-8 w-8" />
              <p className="text-xs">No Image</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:mb-1 md:min-w-0 md:gap-0">
          <h2 className="font-heading text-center text-lg md:mb-2 md:text-left md:text-lg lg:mb-4">
            No Upcoming Trips
          </h2>

          <div className="font-body text-sm italic md:mb-2 md:text-sm lg:mb-5">
            <p className="text-cream/70">
              Check back soon for new adventures, or browse our past events to
              see what we&apos;re all about.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="text-cream/50 text-sm">Stay tuned for updates!</div>
          </div>
        </div>
      </div>
    </div>
  )
}
