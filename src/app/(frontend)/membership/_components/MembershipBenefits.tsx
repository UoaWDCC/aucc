import { SectionCurve } from './section/SectionCurve'
import { SectionHeader } from './section/SectionHeader'

export type MembershipBenefit = {
  title: string
  description: string
}

type MembershipBenefitsProps = {
  intro: string
  benefits: MembershipBenefit[]
}
export function MembershipBenefits({
  intro,
  benefits,
}: MembershipBenefitsProps) {
  return (
    <section className="text-cream relative bg-[#78adad] px-5 pt-14 pb-20 md:px-8 md:pt-20 md:pb-32">
      <SectionCurve className="text-[#78adad]" />
      <SectionHeader
        eyebrow="perks of paddling with us!"
        title="Member benefits"
        eyebrowClassName="text-cream"
        titleClassName="text-cream"
      >
        {intro}
      </SectionHeader>
      <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 md:mt-12 md:grid-cols-3">
        {benefits.map((benefit, i) => (
          <li
            key={benefit.title}
            className="bg-cream text-abyss rounded-2xl px-6 py-5"
          >
            <span className="font-heading text-2xl text-[#8fae62]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-body mt-1 text-lg font-bold italic">
              {benefit.title}
            </h3>
            <p className="font-body mt-1 text-sm leading-5 italic">
              {benefit.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
