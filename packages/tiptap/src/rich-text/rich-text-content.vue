<script setup lang="ts">
import type { Editor as TiptapEditor } from '@tiptap/core'
import type { RichTextProps } from '../shared/types'
import { Editor } from '@tiptap/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { createRichTextExtensions } from '../shared/extensions'
import { isSameRichTextValue, normalizeContentValue, serializeEditorContent } from '../shared/utils'

defineOptions({
  name: 'FRichTextContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RichTextProps>(), {
  output: 'html',
  placeholder: '',
  readOnly: false,
  disabled: false,
  autofocus: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: RichTextProps['modelValue']]
  'blur': [editor: TiptapEditor]
  'focus': [editor: TiptapEditor]
  'ready': [editor: TiptapEditor]
}>()

const editor = shallowRef<TiptapEditor>()
const editorRootRef = ref<HTMLDivElement>()
const isEmpty = ref(true)
const rootClasses = computed(() => ({
  'f-rich-text__content': true,
  'is-empty': isEmpty.value,
}))

function syncEditorEmptyState(currentEditor: TiptapEditor) {
  isEmpty.value = currentEditor.isEmpty
}

function applyAutofocus(currentEditor: TiptapEditor) {
  const autofocus = props.autofocus

  if (autofocus === false || autofocus === null || autofocus === undefined) {
    return
  }

  nextTick(() => {
    if (autofocus === true || autofocus === 'end' || autofocus === 'all') {
      currentEditor.commands.focus('end')
      return
    }

    if (autofocus === 'start' || typeof autofocus === 'number') {
      currentEditor.commands.focus(autofocus)
      return
    }

    currentEditor.commands.focus()
  })
}

function createEditor() {
  if (!editorRootRef.value) {
    return
  }

  const extensions = createRichTextExtensions({
    placeholder: props.placeholder,
    extensions: props.extensions,
  })

  editor.value = new Editor({
    element: editorRootRef.value,
    content: normalizeContentValue(props.modelValue, props.output),
    extensions,
    onCreate: ({ editor }) => {
      editor.setEditable(!(props.readOnly || props.disabled), false)
      syncEditorEmptyState(editor)
      applyAutofocus(editor)
      emit('ready', editor)
    },
    onUpdate: ({ editor }) => {
      syncEditorEmptyState(editor)
      emit('update:modelValue', serializeEditorContent(editor, props.output))
    },
    onBlur: ({ editor }) => {
      emit('blur', editor)
    },
    onFocus: ({ editor }) => {
      emit('focus', editor)
    },
  })
}

onMounted(async () => {
  await nextTick()
  createEditor()
})

onBeforeUnmount(() => {
  editor.value?.destroy()
  editor.value = undefined
})

watch(
  () => props.modelValue,
  (value) => {
    const currentEditor = editor.value
    if (!currentEditor) {
      return
    }

    const nextValue = normalizeContentValue(value, props.output)
    const currentValue = serializeEditorContent(currentEditor, props.output)
    if (isSameRichTextValue(currentValue, nextValue, props.output)) {
      return
    }

    currentEditor.commands.setContent(nextValue as any, {
      emitUpdate: false,
    })
  },
  { deep: true },
)

watch(
  () => [props.readOnly, props.disabled] as const,
  ([readOnly, disabled]) => {
    editor.value?.setEditable(!(readOnly || disabled), false)
  },
)

watch(
  () => props.editorProps,
  (value) => {
    if (!editor.value || !value) {
      return
    }

    editor.value.setOptions({
      editorProps: value,
    })
  },
  { deep: true },
)
</script>

<template>
  <div
    ref="editorRootRef"
    :class="rootClasses"
    :data-placeholder="props.placeholder"
  />
</template>
