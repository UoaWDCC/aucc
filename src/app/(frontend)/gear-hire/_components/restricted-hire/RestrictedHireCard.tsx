import { RequestFormButton } from './RequestFormButton'

export function RestrictedHireCard() {
  return (
    <div className="bg-cream mx-5 mb-25 h-full w-full px-10 py-15 md:mx-20 md:p-20 md:px-20 lg:w-210 lg:px-30 lg:py-20">
      <h1 className="font-heading text-grass text-2xl">
        Restricted gear for club hire
      </h1>
      <div className="text-abyss front-body pt-10 italic">
        <p className="text-black">{`9 - Incept rafts of various sizes (Baby, Tigger, New Lady, Honey, Lola, Cherry, Lola, Cherry, Ruby, Roxanne...)`}</p>
        <p className="pt-7">{` 1 - Braked Tandem Trailer`}</p>
      </div>
      <RequestFormButton />
      <h2 className="font-heading text-grass py-10 text-2xl">
        Restricted hire prices
      </h2>
      <div className="text-abyss front-body italic">
        <p className="text-black">{`Trailer - $30 per day`}</p>
        <p>{`Raft - Context dependent. Contact GSOs`}</p>
      </div>
    </div>
  )
}
