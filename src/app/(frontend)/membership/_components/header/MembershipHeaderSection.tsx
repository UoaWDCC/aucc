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
    <div className="relative flex h-96 w-full flex-col items-center justify-center align-middle md:h-[460px]">
      {headerImage ? <MembershipHeaderImage media={headerImage} /> : null}
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[60px] md:text-[100px] lg:text-[140px]">
          {heading}
        </h1>
        <h2 className="font-body -mt-4 w-60 pl-2 text-center text-xs leading-5 font-light tracking-tighter italic md:-mt-10 md:w-80 md:pl-3 md:text-start md:text-base">
          {subheading}
        </h2>
      </div>
      <MembershipHeaderBottomCurve />
    </div>
  )
}
