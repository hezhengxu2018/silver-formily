import type { Editor } from '@tiptap/core'
import type { CSSProperties } from 'vue'
import type { RichTextOutput, RichTextToolbarItem, RichTextValue } from './types'
import { generateHTML } from '@tiptap/html'

export const DEFAULT_TOOLBAR: RichTextToolbarItem[] = [
  'bold',
  'italic',
  'underline',
  'strike',
  'bulletList',
  'orderedList',
  'blockquote',
  'codeBlock',
  'horizontalRule',
  'undo',
  'redo',
  'clear',
]

export function getToolbarLabel(item: RichTextToolbarItem) {
  return {
    bold: '加粗',
    italic: '斜体',
    underline: '下划线',
    strike: '删除线',
    bulletList: '无序列表',
    orderedList: '有序列表',
    blockquote: '引用',
    codeBlock: '代码块',
    horizontalRule: '分割线',
    undo: '撤销',
    redo: '重做',
    clear: '清空',
  }[item]
}

export function serializeEditorContent(editor: Editor, output: RichTextOutput): RichTextValue {
  return output === 'json' ? editor.getJSON() : editor.getHTML()
}

export function normalizeContentValue(
  value: RichTextValue,
  output: RichTextOutput,
): RichTextValue {
  if (output === 'json') {
    return value ?? {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    }
  }

  return typeof value === 'string' ? value : ''
}

export function isSameRichTextValue(
  left: RichTextValue,
  right: RichTextValue,
  output: RichTextOutput,
): boolean {
  if (output === 'json') {
    return JSON.stringify(left ?? null) === JSON.stringify(right ?? null)
  }

  return String(left ?? '') === String(right ?? '')
}

export function toSizeValue(value?: string | number) {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return typeof value === 'number' ? `${value}px` : value
}

export function createEditorStyle(
  minHeight?: string | number,
  maxHeight?: string | number,
): CSSProperties {
  return {
    '--f-rich-text-min-height': toSizeValue(minHeight) ?? '180px',
    '--f-rich-text-max-height': toSizeValue(maxHeight) ?? '480px',
  } as CSSProperties
}

export function renderPreviewHtml(
  value: RichTextValue,
  output: RichTextOutput,
  extensions: any[],
  sanitize?: (html: string) => string,
) {
  let html = ''

  if (output === 'json' && value && typeof value === 'object') {
    html = generateHTML(value, extensions)
  }
  else if (typeof value === 'string') {
    html = value
  }

  return sanitize ? sanitize(html) : html
}
