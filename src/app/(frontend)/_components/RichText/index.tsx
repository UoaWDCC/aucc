// src/components/RichTextRenderer.tsx
'use client'

import React, { useEffect } from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from '@payloadcms/richtext-lexical/react'

import { internalDocToHref } from './converters/internalLink'

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

export function RichTextRenderer({ data }: { data: SerializedEditorState }) {
  useEffect(() => {
    console.log('Rendering rich text:', data)
  }, [data])

  return <RichText data={data} converters={converters} />
}
