import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils/cn'

interface RichTextProps {
  data: SerializedEditorState
  className?: string
}

export function RichText({ data, className }: RichTextProps) {
  return <PayloadRichText data={data} className={cn('prose', className)} />
}
