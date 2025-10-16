export function GeneralHirePrice() {
  return (
    <div className="bg-cream h-full w-full max-w-150 px-10 py-13 lg:ml-8 lg:px-15 lg:py-17">
      <h1 className="font-heading text-grass text-2xl">General Hire Prices</h1>
      <div className="text-abyss front-body leading-6 italic">
        <p className="pt-7">{`Kayaks** - $10 per day (member)`}</p>
        <p>{`Rafting (seat)** - $20 per day per person (member)`}</p>
        <p>{`Gear - $5 per day (member)`}</p>
        <p className="py-7">{`** all associated gear included`}</p>
        <p>
          Hire of gear for people who are non-members of the club is at the
          discretion of the gear shed officers.
        </p>
      </div>
    </div>
  )
}
