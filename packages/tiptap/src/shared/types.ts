import type { EditorOptions, Extensions, JSONContent } from '@tiptap/core'

export type RichTextOutput = 'html' | 'json'

export type RichTextToolbarItem
  = | 'bold'
    | 'italic'
    | 'underline'
    | 'strike'
    | 'bulletList'
    | 'orderedList'
    | 'blockquote'
    | 'codeBlock'
    | 'horizontalRule'
    | 'undo'
    | 'redo'
    | 'clear'

export type RichTextValue = string | JSONContent | null | undefined

export interface CreateRichTextExtensionsOptions {
  placeholder?: string
  extensions?: Extensions
}

export interface RichTextProps {
  modelValue?: RichTextValue
  output?: RichTextOutput
  toolbar?: false | RichTextToolbarItem[]
  extensions?: Extensions
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  sanitize?: (html: string) => string
  emptyText?: string
  minHeight?: string | number
  maxHeight?: string | number
  autofocus?: EditorOptions['autofocus']
  editorProps?: EditorOptions['editorProps']
}
