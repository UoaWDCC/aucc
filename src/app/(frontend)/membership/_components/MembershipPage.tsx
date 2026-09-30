import type { Media } from '@/payload-types'
import { MembershipHeaderSection } from './header/MembershipHeaderSection'
import { MembershipBenefits } from './MembershipBenefits'
import { MembershipPricing } from './pricing/MembershipPricing'
import { SignUpLink } from './signup/SignUpLink'

type MembershipPageProps = {
  headerImage: Media | null
  heading: string
  subheading: string
  intro: string
  benefits: string
  tiers: { name: string; price: number }[]
  signupUrl: string
}

export function MembershipPage({
  headerImage,
  heading,
  subheading,
  intro,
  benefits,
  tiers,
  signupUrl,
}: MembershipPageProps) {
  return (
    <>
      <MembershipHeaderSection
        headerImage={headerImage}
        heading={heading}
        subheading={subheading}
      />

      <section className="text-abyss bg-[#89ACAD] px-5 py-14 sm:px-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-abyss/80 max-w-2xl text-base leading-7">{intro}</p>
        </div>
      </section>

      <MembershipBenefits content={benefits} />

      <MembershipPricing tiers={tiers} />

      <div className="bg-[#89ACAD] px-5 pb-16 sm:px-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {tiers.length > 0 && <SignUpLink url={signupUrl} />}
        </div>
      </div>
    </>
  )
}
