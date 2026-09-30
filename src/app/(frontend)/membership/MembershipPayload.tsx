import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'
import { MembershipPage } from './_components/MembershipPage'
import { MembershipUnavailable } from './MembershipUnavailable'

export async function MembershipPayload() {
  try {
    const payload = await getPayloadClient()

    const content = await payload.findGlobal({
      slug: 'membership-global',
      depth: 1,
    })

    return (
      <MembershipPage
        headerImage={(content.headerImage as Media) ?? null}
        heading={content.heading}
        subheading={content.subheading}
        intro={content.intro}
        benefits={content.benefits}
        tiers={content.tiers ?? []}
        signupUrl={content.signupUrl ?? ''}
      />
    )
  } catch {
    return <MembershipUnavailable />
  }
}
