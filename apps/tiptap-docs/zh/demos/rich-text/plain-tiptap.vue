<script setup lang="ts">
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

const editor = shallowRef<Editor>()
const editorRootRef = ref<HTMLDivElement>()

onMounted(async () => {
  await nextTick()
  if (!editorRootRef.value) {
    return
  }
  editor.value = new Editor({
    element: editorRootRef.value,
    content: '<p>这是一个不经过 Formily 和 @silver-formily/tiptap 的对照示例。</p>',
    extensions: [StarterKit],
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
  editor.value = undefined
})
</script>

<template>
  <ClientOnly>
    <div class="demo-stack">
      <div class="demo-title">
        官方最小示例对照
      </div>
      <div class="demo-shell">
        <div ref="editorRootRef" />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.demo-stack {
  display: grid;
  gap: 12px;
}

.demo-title {
  color: #475569;
  font-size: 13px;
  font-weight: 600;
}

.demo-shell {
  border: 1px solid #d9e0ea;
  border-radius: 12px;
  min-height: 160px;
  padding: 14px 16px;
}

.demo-shell :deep(.ProseMirror) {
  min-height: 120px;
  outline: none;
}
</style>
