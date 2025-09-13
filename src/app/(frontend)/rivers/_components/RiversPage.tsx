import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media, River } from '@/payload-types'
import { RiversHeaderSection } from './header/RiversHeaderSection'
import { OurRivers } from './intro/OurRivers'

type RiversPageProps = {
  headerImage: Media
  introText: SerializedEditorState
}

export function RiversPage({ headerImage, introText }: RiversPageProps) {
  return (
    <>
      <RiversHeaderSection headerImage={headerImage} />
      <OurRivers introText={introText} />
    </>
  )
}
