import { Media } from '@/payload-types'
import { GearHireHeaderBottomCurve } from './GearHireHeaderBottomCurve'
import { GearHireHeaderImage } from './GearHireHeaderImage'

type GearHireHeaderSectionProps = {
  headerImage: Media
}
export function GearHireHeaderSection({
  headerImage,
}: GearHireHeaderSectionProps) {
  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center align-middle md:h-115">
      <GearHireHeaderImage media={headerImage} />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[50px] tracking-tighter max-[359px]:text-[40px] md:text-[100px] lg:text-[140px]">
          Gear Hire
        </h1>
        <h2 className="font-body -mt-5 w-60 pl-2 text-center text-xs leading-4 font-light tracking-tighter italic max-[359px]:pt-2 md:-mt-8 md:w-70 md:pl-3 md:text-start md:text-base lg:-mt-10 lg:w-90">
          The hub for everything you need to know about gear and equipment hire.
        </h2>
      </div>
      <GearHireHeaderBottomCurve />
    </div>
  )
}
