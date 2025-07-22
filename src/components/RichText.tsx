// src/components/RichText.tsx
'use client'

import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

type RichTextProps = {
  content: any
}

export const RichText = ({ content }: RichTextProps) => {
  if (!content) {
    return null
  }

  return <LexicalRichText data={content} />
}