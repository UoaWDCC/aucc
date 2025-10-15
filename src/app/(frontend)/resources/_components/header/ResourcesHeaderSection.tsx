import { Media } from '@/payload-types'
import { ResourcesHeaderBottomSlope } from './ResourcesHeaderBottomSlope'
import { ResourcesHeaderImage } from './ResourcesHeaderImage'

type ResourcesHeaderSectionProps = {
  headerImage: Media
}

export function ResourcesHeaderSection({
  headerImage,
}: ResourcesHeaderSectionProps) {
  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center align-middle md:h-165">
      <ResourcesHeaderImage media={headerImage} />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[60px] md:text-[100px] lg:text-[140px]">
          Resources (WIP)
        </h1>
        <h2 className="font-body -mt-4 w-60 pl-2 text-center text-xs leading-5 font-light tracking-tighter italic md:-mt-10 md:w-80 md:pl-3 md:text-start md:text-base">
          Helpful resources and links. (This page is a work in progress)
        </h2>
      </div>
      <ResourcesHeaderBottomSlope />
    </div>
  )
}
