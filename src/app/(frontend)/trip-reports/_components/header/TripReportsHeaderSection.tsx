import { Media } from '@/payload-types'
import { getTripReportsGlobal } from '@/queries/trip-reports-global'
import { TripReportsHeaderBottomCurve } from './TripReportsHeaderBottomCurve'
import { TripReportsHeaderImage } from './TripReportsHeaderImage'

type TripReportsHeaderSectionProps = {
  headerImage: Media
}

export async function TripreportsHeaderSection({
  headerImage,
}: TripReportsHeaderSectionProps) {
  return (
    <div className="relative flex h-110 w-full flex-col items-center justify-center align-middle md:h-115">
      <TripReportsHeaderImage media={headerImage} />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[50px] sm:text-[60px] md:text-[100px] lg:text-[140px]">
          Reports
        </h1>
        <h2 className="font-body -mt-4 w-60 pl-2 text-center text-xs leading-5 font-light tracking-tighter italic md:-mt-10 md:w-80 md:pl-3 md:text-start md:text-base">
          Information, images, and testimonials from previous members on our
          past events!
        </h2>
      </div>
      <TripReportsHeaderBottomCurve />
    </div>
  )
}
