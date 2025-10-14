import Button from '@/components/Button'

export function TripOrganizingText() {
  return (
    <div className="mb-46 flex w-full flex-col items-end pt-33 pr-25">
      <h1 className="font-heading text-water text-end text-5xl">
        TRIP ORGANISING
      </h1>
      <div className="mt-8 flex">
        <div className="mr-11 flex flex-col justify-center gap-5">
          <Button
            className="text-abyss bg-water border-water h-8 w-46 px-4 text-xs tracking-tighter"
            intent="primary"
          >
            ORGANIZE A TRIP GUIDE
          </Button>
          <Button
            className="text-water border-water h-8 w-46 bg-none px-4 text-xs tracking-tighter"
            intent="primary"
          >
            TRIP ORGANIZE TEMPLATE
          </Button>
        </div>
        <div className="flex w-fit flex-col text-end">
          <p className="text-cream font-body w-105 text-sm">
            It’s not only your instructors and exec members that can organise
            trips. We welcome all club members (no matter the experience level)
            to organise a trip of their choosing. We&#39;ll even give you all
            the help and support you need to ensure a smooth, safe and enjoyable
            trip. It isn’t as scary as it may seem!
          </p>
          <br />
          <p className="text-cream font-body w-105 text-sm">
            Here is a guidebook to help you get started on planning a trip and a
            trip planning template that you&#39;ll need to fill out and get
            signed off by the River Vice President or River Safety Officer.
          </p>
        </div>
      </div>
    </div>
  )
}
