import Link from 'next/link'

type NextAdventureButtonProps = {
  eventId: number
}

export function NextAdventureButtons({ eventId }: NextAdventureButtonProps) {
  return (
    <div className="flex w-full items-start gap-3.5">
      <button className="text-abyss bg-algae cursor-pointer rounded-3xl px-5 py-2 text-xs">
        Sign Up
      </button>
      <Link href={`/events/${eventId}`}>
        <button className="text-algae cursor-pointer rounded-3xl border-2 px-3 py-1.5 text-xs">
          Trip Details
        </button>
      </Link>
    </div>
  )
}
