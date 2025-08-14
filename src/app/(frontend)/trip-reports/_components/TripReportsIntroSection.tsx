import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

type TripReportsIntroSectionProps = {
  introText: SerializedEditorState
}

export function TripReportsIntroSection({
  introText,
}: TripReportsIntroSectionProps) {
  return (
    <div className="bg-cream relative inset-0 flex w-full justify-center pt-8 pb-16 md:pt-16">
      <div className="mx-8 flex max-w-200 flex-col gap-x-12 gap-y-4 md:flex-row">
        <h2 className="font-heading text-grass text-center text-2xl tracking-tighter whitespace-nowrap capitalize md:text-4xl">
          LATEST <br className="hidden md:block" />
          REPORTS
        </h2>
        <RichText
          className="font-body text-abyss w-full max-w-105 text-sm italic md:w-130"
          data={introText}
        />
      </div>
    </div>
  )
}
