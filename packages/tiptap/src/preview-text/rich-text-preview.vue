<script setup lang="ts">
import type { RichTextProps } from '../shared/types'
import { computed } from 'vue'
import { createRichTextExtensions } from '../shared/extensions'
import { renderPreviewHtml } from '../shared/utils'

defineOptions({
  name: 'FRichTextPreview',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RichTextProps>(), {
  output: 'html',
  emptyText: '-',
})

const extensions = computed(() => {
  return createRichTextExtensions({
    placeholder: props.placeholder,
    extensions: props.extensions,
  })
})

const previewHtml = computed(() => {
  return renderPreviewHtml(
    props.modelValue,
    props.output,
    extensions.value,
    props.sanitize,
  )
})

const isEmpty = computed(() => !previewHtml.value.trim())
</script>

<template>
  <div
    v-if="!isEmpty"
    class="f-rich-text-preview"
    v-bind="$attrs"
    v-html="previewHtml"
  />
  <div
    v-else
    class="f-rich-text-preview is-empty"
    v-bind="$attrs"
  >
    {{ props.emptyText }}
  </div>
</template>

<style scoped>
.f-rich-text-preview {
  --f-rich-text-preview-text: #1f2937;
  --f-rich-text-preview-muted: #64748b;
  --f-rich-text-preview-border: #d9e0ea;
  --f-rich-text-preview-code-bg: #f4f7fb;
  color: var(--f-rich-text-preview-text);
  line-height: 1.7;
  word-break: break-word;
}

.f-rich-text-preview.is-empty {
  color: var(--f-rich-text-preview-muted);
}

.f-rich-text-preview :deep(p) {
  margin: 0 0 12px;
}

.f-rich-text-preview :deep(p:last-child) {
  margin-bottom: 0;
}

.f-rich-text-preview :deep(ul),
.f-rich-text-preview :deep(ol),
.f-rich-text-preview :deep(blockquote),
.f-rich-text-preview :deep(pre) {
  margin: 0 0 12px;
}

.f-rich-text-preview :deep(blockquote) {
  border-left: 4px solid var(--f-rich-text-preview-border);
  color: var(--f-rich-text-preview-muted);
  margin-left: 0;
  padding-left: 12px;
}

.f-rich-text-preview :deep(pre) {
  background: var(--f-rich-text-preview-code-bg);
  border-radius: 8px;
  overflow-x: auto;
  padding: 12px 14px;
}
</style>
