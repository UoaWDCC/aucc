import { SpecificRiverBottomCurve } from './SpecificRiverBottomCurve'
import { SpecificRiverGallerySection } from './SpecificRiverGallerySection'

type SpecificRiverFooterProps = {
  name: string
}

export function SpecificRiverFooter({ name }: SpecificRiverFooterProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-0 w-full">
        <SpecificRiverBottomCurve />
      </div>
      <div className="relative z-10 pt-52">
        <SpecificRiverGallerySection name={name} />
      </div>
    </div>
  )
}
