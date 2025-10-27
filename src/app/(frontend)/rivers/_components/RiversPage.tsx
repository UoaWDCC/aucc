import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media } from '@/payload-types'
import { RiverDTO } from '@/queries/rivers'
import { RiversHeaderSection } from './header/RiversHeaderSection'
import { OurRivers } from './intro/OurRivers'
import { RiverCardSection } from './river-cards/RiverCardSection'

type RiversPageProps = {
  headerImage: Media
  introText: SerializedEditorState
  rivers: RiverDTO[]
}
export function RiversPage({ headerImage, introText }: RiversPageProps) {
  return (
    <>
      <RiversHeaderSection headerImage={headerImage} />
      <OurRivers introText={introText} />
      <RiverCardSection />
    </>
  )
}
