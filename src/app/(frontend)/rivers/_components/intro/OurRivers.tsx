import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { OurRiversText } from './OurRiversText'

type RiversIntroSectionProps = {
  introText: SerializedEditorState
}
export function OurRivers({ introText }: RiversIntroSectionProps) {
  return (
    <div className="bg-cream relative inset-0 h-full">
      <div className="flex flex-col items-center justify-center gap-10 py-17 md:flex-row md:gap-20 lg:gap-30">
        <div className="md:w-[45%]">
          <OurRiversText />
        </div>

        <div className="px-12 md:w-[55%] md:px-20 lg:pr-30 lg:pl-5">
          <RichText
            className="font-body text-abyss text-center text-sm italic"
            data={introText}
          />
        </div>
      </div>
    </div>
  )
}
