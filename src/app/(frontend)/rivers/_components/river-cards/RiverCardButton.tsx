import Link from 'next/link'

type RiverCardButtonProps = {
  riverSlug: string
}

export function RiverCardButtons({ riverSlug }: RiverCardButtonProps) {
  return (
    <div className="mt-5 w-full items-end justify-items-end text-right text-xs md:-mt-10 md:place-self-end md:text-sm">
      <Link href={`/rivers/${riverSlug}`}>
        <button className="text-algae font-unbounded cursor-pointer rounded-3xl border-2 px-3 py-1.5 md:px-2 md:py-1 lg:px-4 lg:py-2.5">
          RIVER DETAILS
        </button>
      </Link>
    </div>
  )
}
