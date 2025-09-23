'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@/components/RichText'

type UpcomingEventsBoxProps = {
  petrolCosts: SerializedEditorState
}

export function UpcomingEventsBox({ petrolCosts }: UpcomingEventsBoxProps) {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-lg border border-[#9AA687] bg-transparent p-6 text-left md:mx-0 md:mt-2">
      <h3 className="font-heading text-grass mb-4 text-center text-base text-lg tracking-tighter">
        PETROL COSTS
      </h3>

      <div className="prose prose-sm text-grass max-w-none italic">
        <RichText data={petrolCosts} />
      </div>
    </div>
  )
}
