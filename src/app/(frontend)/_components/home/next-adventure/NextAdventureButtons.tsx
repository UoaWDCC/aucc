import Link from 'next/link'

type NextAdventureButtonProps = {
  eventId: number
}

export function NextAdventureButtons({ eventId }: NextAdventureButtonProps) {
  return (
    <div className="flex w-full items-start gap-3.5 text-xs md:text-xs">
      <Link href={`/events/${eventId}`}>
        <button className="text-algae font-unbounded cursor-pointer rounded-3xl border-2 px-3 py-1.5 md:px-2 md:py-1 lg:px-4 lg:py-2.5">
          Trip Details
        </button>
      </Link>
    </div>
  )
}
