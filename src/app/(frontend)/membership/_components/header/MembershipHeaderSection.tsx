import Button from '@/components/Button'
import { Media } from '@/payload-types'
import { MembershipHeaderBottomCurve } from './MembershipHeaderBottomCurve'
import { MembershipHeaderImage } from './MembershipHeaderImage'

type MembershipHeaderSectionProps = {
  headerImage: Media | null
  heading: string
  subheading: string
}
export function MembershipHeaderSection({
  headerImage,
  heading,
  subheading,
}: MembershipHeaderSectionProps) {
  return (
    <div className="relative flex h-[370px] w-full flex-col justify-end md:h-[600px]">
      {headerImage ? <MembershipHeaderImage media={headerImage} /> : null}
      <div className="text-cream relative z-1 mx-auto w-full max-w-5xl px-5 pb-14 md:px-8 md:pb-32">
        <p className="font-[family-name:var(--font-caveat-brush)] text-lg text-[#8fae62] md:text-2xl">
          join the crew!
        </p>
        <h1 className="font-heading text-4xl leading-none uppercase sm:text-7xl lg:text-[7.5rem]">
          {heading}
        </h1>
        <h2 className="font-body mt-3 max-w-xs text-xs leading-5 font-light italic md:mt-5 md:max-w-md md:text-base md:leading-6">
          {subheading}
        </h2>
        <div className="mt-6 flex justify-start">
          <Button
            intent="primary"
            size="md"
            className="font-unbounded text-abyss border-0 bg-[#98b969] px-10 text-[15px] font-bold uppercase md:w-auto"
            href="#plans"
          >
            See plans
          </Button>
        </div>
      </div>
      <MembershipHeaderBottomCurve />
    </div>
  )
}
