import { RiverDTO } from '@/queries/rivers'
import { RiverGallerySection } from './SpecificRiverGallery/RiverGallerySection'
import { SpecificRiverFooter } from './SpecificRiverGallery/SpecificRiverFooter'
import { SpecificRiverHeader } from './SpecificRiverHeader/SpecificRiverHeader'
import { SpecificRiverInfo } from './SpecificRiverInfo/SpecificRiverInfo'

interface RiverPageProps {
  river: RiverDTO
}

export function RiverPage({ river }: RiverPageProps) {
  const slug = typeof river.slug === 'string' ? river.slug : ''
  return (
    <>
      <SpecificRiverHeader river={river} />
      <div className="p-4">
        <h1 className="text-center text-3xl font-bold">{river.name}</h1>
        <div className="h-150 p-2">
          <div className="p-2">
            <div>{river.grade && <p>Grade: {river.grade}</p>}</div>
            <div>{river.description && <p>{river.description}</p>}</div>
          </div>
        </div>
      </div>
      <SpecificRiverFooter name={river.name} />
    </>
  )
}
