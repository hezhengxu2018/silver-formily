import type { Extensions } from '@tiptap/core'
import type { CreateRichTextExtensionsOptions } from './types'
import StarterKit from '@tiptap/starter-kit'

export function createRichTextExtensions(
  options: CreateRichTextExtensionsOptions = {},
): Extensions {
  const extensions: Extensions = [
    StarterKit,
  ]

  if (options.extensions?.length) {
    extensions.push(...options.extensions)
  }

  return extensions
}
