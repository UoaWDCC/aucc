import { getMembershipGlobal } from '@/queries/membership-global'
import { MembershipPage } from './_components/MembershipPage'
import { MembershipUnavailable } from './MembershipUnavailable'

export async function MembershipPayload() {
  try {
    const content = await getMembershipGlobal()

    return (
      <MembershipPage
        headerImage={
          typeof content.headerImage === 'object' ? content.headerImage : null
        }
        heading={content.heading}
        subheading={content.subheading}
        intro={content.intro}
        benefitsIntro={content.benefitsIntro ?? ''}
        benefits={content.benefitItems ?? []}
        tiers={content.tiers ?? []}
        signupUrl={content.signupUrl ?? ''}
      />
    )
  } catch (error) {
    console.error('Error fetching membership global:', error)
    return <MembershipUnavailable />
  }
}
