
'use client'

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

type NewType = {
    content: DefaultTypedEditorState
}

type RichTextProps = NewType

export const RichText = ({ content }: RichTextProps) => {
  if (!content) {
    return null
  }

  return <LexicalRichText data={content} />
}