import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getMembershipGlobal } from '@/queries/membership-global'
import { MembershipPayload } from './MembershipPayload'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Membership',
    description:
      'Join the Auckland University Canoe Club: membership options, prices, what you get and how to sign up.',
    path: '/membership',
    image: await headerImageOf(getMembershipGlobal),
  })
}

export default async function Page() {
  return <MembershipPayload />
}
