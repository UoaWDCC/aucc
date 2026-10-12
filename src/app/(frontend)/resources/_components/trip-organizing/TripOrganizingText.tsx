import Button from '@/components/Button'

const TRIP_GUIDE_URL = '#'
const TRIP_TEMPLATE_URL = '#'

export function TripOrganizingText() {
  return (
    <div className="flex w-full flex-col items-center px-6 pt-20 pb-24 md:items-end md:pt-33 md:pr-25 md:pb-46">
      <h2 className="font-heading text-water text-center text-3xl md:text-end md:text-5xl">
        TRIP ORGANISING
      </h2>
      <div className="mt-8 flex flex-col-reverse items-center gap-8 md:flex-row md:gap-11">
        <div className="flex flex-col gap-5">
          <Button
            href={TRIP_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="text-abyss bg-water border-water font-unbounded w-46 px-4 text-[10px]"
          >
            ORGANIZE A TRIP GUIDE
          </Button>
          <Button
            href={TRIP_TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="text-water border-water font-unbounded w-46 px-4 text-[10px]"
          >
            TRIP ORGANIZE TEMPLATE
          </Button>
        </div>
        <div className="text-cream font-body flex max-w-105 flex-col gap-5 text-center text-sm italic md:text-end">
          <p>
            It’s not only your instructors and exec members that can organise
            trips. We welcome all club members (no matter the experience level)
            to organise a trip of their choosing. We&#39;ll even give you all
            the help and support you need to ensure a smooth, safe and enjoyable
            trip. It isn’t as scary as it may seem!
          </p>
          <p>
            Here is a guidebook to help you get started on planning a trip and a
            trip planning template that you&#39;ll need to fill out and get
            signed off by the River Vice President or River Safety Officer.
          </p>
        </div>
      </div>
    </div>
  )
}
