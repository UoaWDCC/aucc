import type { Media } from '@/payload-types'
import { MembershipHeaderSection } from './header/MembershipHeaderSection'
import { MembershipBenefit, MembershipBenefits } from './MembershipBenefits'
import { MembershipPricing, MembershipTier } from './pricing/MembershipPricing'
import { SectionCurve } from './section/SectionCurve'
import { SectionHeader } from './section/SectionHeader'
import { SignUpLink } from './signup/SignUpLink'

type MembershipPageProps = {
  headerImage: Media | null
  heading: string
  subheading: string
  intro: string
  benefitsIntro: string
  benefits: MembershipBenefit[]
  tiers: MembershipTier[]
  signupUrl: string
}

export function MembershipPage({
  headerImage,
  heading,
  subheading,
  intro,
  benefitsIntro,
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

      <MembershipPricing intro={intro} tiers={tiers} />

      <MembershipBenefits intro={benefitsIntro} benefits={benefits} />
      <section className="bg-abyss text-cream relative px-5 pt-14 pb-20 text-center md:px-8 md:pt-24 md:pb-28">
        <SectionCurve className="text-abyss" />
        <SectionHeader
          eyebrow="what are you waiting for?"
          title="Ready to join?"
          eyebrowClassName="text-[#8fae62]"
          titleClassName="text-cream"
        >
          It only takes a couple of minutes. Fill in the membership form and
          we&apos;ll get you on the next trip.
        </SectionHeader>
        <div className="mt-6 md:mt-8">
          {tiers.length > 0 && <SignUpLink url={signupUrl} />}
        </div>
        <p className="font-body mx-auto mt-6 max-w-xs text-xs italic md:max-w-none">
          Got questions? Message us on Facebook or Instagram @aucc_nz
        </p>
      </section>
    </>
  )
}
