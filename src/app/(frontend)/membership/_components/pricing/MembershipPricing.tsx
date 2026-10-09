import { cn } from '@/lib/utils/cn'
import { NoActiveTiers } from '../errors/NoActiveTiers'
import { SectionHeader } from '../section/SectionHeader'

export type MembershipTier = {
  name: string
  price: number
  description?: string | null
  perks?: { perk: string }[] | null
}

type MembershipPricingProps = {
  intro?: string
  tiers: MembershipTier[]
}

export function MembershipPricing({ intro, tiers }: MembershipPricingProps) {
  return (
    <section
      id="plans"
      className="bg-cream text-abyss relative scroll-mt-4 px-5 pt-14 pb-20 md:px-8 md:pt-20 md:pb-32"
    >
      <SectionHeader
        eyebrow="cheaper than a new paddle!"
        title="Pick your plan"
        eyebrowClassName="text-[#8fae62]"
        titleClassName="text-[#8fae62]"
      >
        {intro}
      </SectionHeader>
      {tiers.length === 0 ? (
        <NoActiveTiers />
      ) : (
        <div className="mx-auto mt-8 grid max-w-[640px] grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-9">
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} featured={i === 0} />
          ))}
        </div>
      )}
    </section>
  )
}

function TierCard({
  tier,
  featured,
}: {
  tier: MembershipTier
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[20px] p-6',
        featured ? 'bg-abyss text-cream' : 'text-abyss bg-[#d2e1db]',
      )}
    >
      <h3 className="font-unbounded text-base font-semibold uppercase md:text-lg">
        {tier.name}
      </h3>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="font-heading text-4xl text-[#8fae62] md:text-5xl">
          ${tier.price}
        </span>
        <span className="font-body text-sm italic">/ year</span>
      </p>
      {tier.description ? (
        <p className="font-body mt-4 text-sm leading-5 italic">
          {tier.description}
        </p>
      ) : null}
      {tier.perks?.length ? (
        <ul
          className={cn(
            'mt-4 flex flex-col gap-2 border-t pt-4',
            featured ? 'border-cream/25' : 'border-abyss/25',
          )}
        >
          {tier.perks.map(({ perk }) => (
            <li
              key={perk}
              className="font-body flex items-center gap-3 text-sm italic"
            >
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full bg-[#8fae62]"
              />
              {perk}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
