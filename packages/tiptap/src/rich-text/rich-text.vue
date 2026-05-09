<script setup lang="ts">
import type { Editor as TiptapEditor } from '@tiptap/core'
import type { RichTextProps, RichTextToolbarItem } from '../shared/types'
import { computed, shallowRef, useAttrs } from 'vue'
import {
  createEditorStyle,
  DEFAULT_TOOLBAR,
  getToolbarLabel,
} from '../shared/utils'
import RichTextContent from './rich-text-content.vue'

defineOptions({
  name: 'FRichText',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RichTextProps>(), {
  output: 'html',
  toolbar: () => DEFAULT_TOOLBAR,
  placeholder: '',
  readOnly: false,
  disabled: false,
  emptyText: '-',
  minHeight: '180px',
  maxHeight: '480px',
  autofocus: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: RichTextProps['modelValue']]
  'blur': [editor: TiptapEditor]
  'focus': [editor: TiptapEditor]
  'ready': [editor: TiptapEditor]
}>()

const attrs = useAttrs()
const rootAttrs = computed(() => {
  const {
    modelValue: _modelValue,
    'onUpdate:modelValue': _onUpdateModelValue,
    readOnly: _readOnly,
    disabled: _disabled,
    ...rest
  } = attrs

  return rest
})

const toolbarItems = computed(() => {
  return props.toolbar === false ? [] : props.toolbar
})

const editorStyle = computed(() => {
  return createEditorStyle(props.minHeight, props.maxHeight)
})
const editor = shallowRef<TiptapEditor>()

function handleReady(currentEditor: TiptapEditor) {
  editor.value = currentEditor
  emit('ready', currentEditor)
}

function handleBlur(currentEditor: TiptapEditor) {
  emit('blur', currentEditor)
}

function handleFocus(currentEditor: TiptapEditor) {
  emit('focus', currentEditor)
}

function handleUpdateModelValue(value: RichTextProps['modelValue']) {
  emit('update:modelValue', value)
}

function canRun(item: RichTextToolbarItem) {
  const currentEditor = editor.value
  if (!currentEditor || props.readOnly || props.disabled) {
    return false
  }

  switch (item) {
    case 'undo':
      return currentEditor.can().chain().focus().undo().run()
    case 'redo':
      return currentEditor.can().chain().focus().redo().run()
    case 'clear':
      return true
    case 'bold':
      return currentEditor.can().chain().focus().toggleBold().run()
    case 'italic':
      return currentEditor.can().chain().focus().toggleItalic().run()
    case 'underline':
      return currentEditor.can().chain().focus().toggleUnderline().run()
    case 'strike':
      return currentEditor.can().chain().focus().toggleStrike().run()
    case 'bulletList':
      return currentEditor.can().chain().focus().toggleBulletList().run()
    case 'orderedList':
      return currentEditor.can().chain().focus().toggleOrderedList().run()
    case 'blockquote':
      return currentEditor.can().chain().focus().toggleBlockquote().run()
    case 'codeBlock':
      return currentEditor.can().chain().focus().toggleCodeBlock().run()
    case 'horizontalRule':
      return currentEditor.can().chain().focus().setHorizontalRule().run()
    default:
      return false
  }
}

function isActive(item: RichTextToolbarItem) {
  const currentEditor = editor.value
  if (!currentEditor) {
    return false
  }

  switch (item) {
    case 'bold':
      return currentEditor.isActive('bold')
    case 'italic':
      return currentEditor.isActive('italic')
    case 'underline':
      return currentEditor.isActive('underline')
    case 'strike':
      return currentEditor.isActive('strike')
    case 'bulletList':
      return currentEditor.isActive('bulletList')
    case 'orderedList':
      return currentEditor.isActive('orderedList')
    case 'blockquote':
      return currentEditor.isActive('blockquote')
    case 'codeBlock':
      return currentEditor.isActive('codeBlock')
    default:
      return false
  }
}

function runCommand(item: RichTextToolbarItem) {
  const currentEditor = editor.value
  if (!currentEditor || !canRun(item)) {
    return
  }

  switch (item) {
    case 'undo':
      currentEditor.chain().focus().undo().run()
      break
    case 'redo':
      currentEditor.chain().focus().redo().run()
      break
    case 'clear':
      currentEditor.chain().focus().clearContent().run()
      break
    case 'bold':
      currentEditor.chain().focus().toggleBold().run()
      break
    case 'italic':
      currentEditor.chain().focus().toggleItalic().run()
      break
    case 'underline':
      currentEditor.chain().focus().toggleUnderline().run()
      break
    case 'strike':
      currentEditor.chain().focus().toggleStrike().run()
      break
    case 'bulletList':
      currentEditor.chain().focus().toggleBulletList().run()
      break
    case 'orderedList':
      currentEditor.chain().focus().toggleOrderedList().run()
      break
    case 'blockquote':
      currentEditor.chain().focus().toggleBlockquote().run()
      break
    case 'codeBlock':
      currentEditor.chain().focus().toggleCodeBlock().run()
      break
    case 'horizontalRule':
      currentEditor.chain().focus().setHorizontalRule().run()
      break
  }
}
</script>

<template>
  <div
    class="f-rich-text"
    :class="{
      'is-readonly': props.readOnly || props.disabled,
    }"
    v-bind="rootAttrs"
  >
    <div
      v-if="toolbarItems.length"
      class="f-rich-text__toolbar"
      role="toolbar"
      aria-label="富文本工具栏"
    >
      <button
        v-for="item in toolbarItems"
        :key="item"
        class="f-rich-text__toolbar-button"
        :class="{ 'is-active': isActive(item) }"
        type="button"
        :disabled="!canRun(item)"
        @click="runCommand(item)"
      >
        {{ getToolbarLabel(item) }}
      </button>
    </div>
    <div class="f-rich-text__editor" :style="editorStyle">
      <RichTextContent
        :model-value="props.modelValue"
        :output="props.output"
        :placeholder="props.placeholder"
        :read-only="props.readOnly"
        :disabled="props.disabled"
        :extensions="props.extensions"
        :autofocus="props.autofocus"
        :editor-props="props.editorProps"
        @ready="handleReady"
        @blur="handleBlur"
        @focus="handleFocus"
        @update:model-value="handleUpdateModelValue"
      />
    </div>
  </div>
</template>

<style scoped>
.f-rich-text {
  --f-rich-text-bg: #fff;
  --f-rich-text-bg-muted: #f8fafc;
  --f-rich-text-border: #d9e0ea;
  --f-rich-text-border-strong: #7c3aed;
  --f-rich-text-text: #1f2937;
  --f-rich-text-text-muted: #64748b;
  --f-rich-text-code-bg: #f4f7fb;
  --f-rich-text-toolbar-active-bg: #eef2ff;
  --f-rich-text-toolbar-active-text: #4338ca;
  --f-rich-text-shadow: color-mix(in srgb, var(--f-rich-text-border-strong) 20%, transparent);
  background: var(--f-rich-text-bg);
  border: 1px solid var(--f-rich-text-border);
  border-radius: 12px;
  color: var(--f-rich-text-text);
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.f-rich-text:focus-within {
  border-color: var(--f-rich-text-border-strong);
  box-shadow: 0 0 0 1px var(--f-rich-text-shadow);
}

.f-rich-text.is-readonly {
  background: var(--f-rich-text-bg-muted);
}

.f-rich-text__toolbar {
  background: color-mix(in srgb, var(--f-rich-text-bg-muted) 75%, white);
  border-bottom: 1px solid var(--f-rich-text-border);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
}

.f-rich-text__toolbar-button {
  background: transparent;
  border: 1px solid var(--f-rich-text-border);
  border-radius: 8px;
  color: var(--f-rich-text-text-muted);
  cursor: pointer;
  font: inherit;
  line-height: 1;
  padding: 7px 10px;
  transition: all 0.2s ease;
}

.f-rich-text__toolbar-button:hover:not(:disabled) {
  border-color: var(--f-rich-text-border-strong);
  color: var(--f-rich-text-border-strong);
}

.f-rich-text__toolbar-button.is-active {
  background: var(--f-rich-text-toolbar-active-bg);
  border-color: color-mix(in srgb, var(--f-rich-text-toolbar-active-text) 30%, white);
  color: var(--f-rich-text-toolbar-active-text);
}

.f-rich-text__toolbar-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.f-rich-text__editor {
  min-height: var(--f-rich-text-min-height);
}

.f-rich-text__content {
  min-height: inherit;
  position: relative;
}

.f-rich-text__content.is-empty::before {
  color: var(--f-rich-text-text-muted);
  content: attr(data-placeholder);
  left: 16px;
  pointer-events: none;
  position: absolute;
  top: 14px;
  z-index: 1;
}

.f-rich-text :deep(.tiptap) {
  box-sizing: border-box;
  max-height: var(--f-rich-text-max-height);
  min-height: var(--f-rich-text-min-height);
  outline: none;
  overflow-y: auto;
  padding: 14px 16px;
  word-break: break-word;
}

.f-rich-text :deep(.tiptap p) {
  margin: 0 0 12px;
}

.f-rich-text :deep(.tiptap p:last-child) {
  margin-bottom: 0;
}

.f-rich-text :deep(.tiptap ul),
.f-rich-text :deep(.tiptap ol),
.f-rich-text :deep(.tiptap blockquote),
.f-rich-text :deep(.tiptap pre) {
  margin: 0 0 12px;
}

.f-rich-text :deep(.tiptap blockquote) {
  border-left: 4px solid var(--f-rich-text-border);
  color: var(--f-rich-text-text-muted);
  margin-left: 0;
  padding-left: 12px;
}

.f-rich-text :deep(.tiptap pre) {
  background: var(--f-rich-text-code-bg);
  border-radius: 8px;
  overflow-x: auto;
  padding: 12px 14px;
}
</style>
