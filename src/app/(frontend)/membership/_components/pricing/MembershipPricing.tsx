import { NoActiveTiers } from '../errors/NoActiveTiers'

type MembershipTier = {
  name: string
  price: number
}

type MembershipPricingProps = {
  tiers: MembershipTier[]
}

export function MembershipPricing({ tiers }: MembershipPricingProps) {
  if (tiers.length === 0) return <NoActiveTiers />

  return (
    <section className="text-cream bg-[#89ACAD] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="border-/25 mb-10 flex flex-col gap-5 border-b pb-7 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-2xl leading-tight sm:text-3xl md:text-4xl">
              Membership pricing
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col rounded-lg bg-[#89ACAD] p-6 text-center"
            >
              <h3 className="text-abyss font-heading text-lg font-semibold sm:text-xl md:text-2xl">
                {tier.name}
              </h3>
              <p className="text-abyss mt-4 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
                ${tier.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
