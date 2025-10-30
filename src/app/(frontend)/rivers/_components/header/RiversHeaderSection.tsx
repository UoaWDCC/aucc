import { Media } from '@/payload-types'
import { RiversHeaderBottomCurve } from './RiversHeaderBottomCurve'
import { RiversHeaderImage } from './RiversHeaderImage'

type RiversHeaderSectionProps = {
  headerImage: Media | null
}
export function RiversHeaderSection({ headerImage }: RiversHeaderSectionProps) {
  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center align-middle md:h-115">
      <RiversHeaderImage media={headerImage} />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[60px] md:text-[100px] lg:text-[140px]">
          Rivers
        </h1>
        <h2 className="font-body -mt-5 w-60 pl-2 text-center text-xs leading-4 font-light tracking-tighter italic md:-mt-8 md:w-70 md:pl-3 md:text-start md:text-base lg:-mt-10 lg:w-90">
          Here are the rivers that the club regularly paddles, ordered by grade.
        </h2>
      </div>
      <RiversHeaderBottomCurve />
    </div>
  )
}
