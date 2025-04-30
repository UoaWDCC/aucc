import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface RichTextRendererProps {
  data: SerializedEditorState
  className?: string
}

export function RichTextRenderer({ data, className }: RichTextRendererProps) {
  return <RichText data={data} className={className} />
}
