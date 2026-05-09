<script setup lang="ts">
import { createForm } from '@formily/core'
import { RichText } from '@silver-formily/tiptap'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

const plainEditor = shallowRef<Editor>()
const plainEditorRootRef = ref<HTMLDivElement>()
const form = createForm({
  values: {
    content: '<p>这是 Formily 包装版编辑器的初始值。</p>',
  },
})

onMounted(async () => {
  await nextTick()
  if (!plainEditorRootRef.value) {
    return
  }

  plainEditor.value = new Editor({
    element: plainEditorRootRef.value,
    content: '<p>这是纯 Tiptap 原生编辑器。</p>',
    extensions: [StarterKit],
  })
})

onBeforeUnmount(() => {
  plainEditor.value?.destroy()
  plainEditor.value = undefined
})
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">
        Tiptap Playground
      </p>
      <h1>脱离文档主题的独立预览</h1>
      <p class="lead">
        这个页面同时展示纯 Tiptap 原生编辑器，以及基于 Formily 的 `@silver-formily/tiptap` 封装，方便直接对比运行状态。
      </p>
    </section>

    <section class="grid">
      <article class="panel">
        <h2>纯 Tiptap 原生</h2>
        <div class="editor-shell">
          <div ref="plainEditorRootRef" />
        </div>
      </article>

      <article class="panel">
        <h2>@silver-formily/tiptap</h2>
        <FormProvider :form="form">
          <div class="editor-shell">
            <Field
              name="content"
              :component="[
                RichText,
                {
                  output: 'html',
                  placeholder: '请输入内容',
                },
              ]"
            />
          </div>
          <FormConsumer>
            <template #default="{ form: consumerForm }">
              <div class="output-card">
                <div class="output-title">
                  当前 HTML 输出
                </div>
                <pre>{{ consumerForm.values.content }}</pre>
              </div>
            </template>
          </FormConsumer>
        </FormProvider>
      </article>
    </section>
  </main>
</template>

<style scoped>
.page {
  background:
    radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(124, 58, 237, 0.12), transparent 32%), #f8fafc;
  color: #0f172a;
  min-height: 100vh;
  padding: 40px 24px 56px;
}

.hero {
  margin: 0 auto 28px;
  max-width: 1120px;
}

.eyebrow {
  color: #7c3aed;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 10px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(32px, 5vw, 52px);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0;
}

.lead {
  color: #475569;
  font-size: 16px;
  line-height: 1.7;
  margin: 14px 0 0;
  max-width: 760px;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0 auto;
  max-width: 1120px;
}

.panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(217, 224, 234, 0.9);
  border-radius: 20px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.06);
  padding: 22px;
}

.panel h2 {
  font-size: 18px;
  margin: 0 0 16px;
}

.editor-shell {
  min-height: 220px;
}

.editor-shell :deep(.ProseMirror) {
  min-height: 180px;
  outline: none;
}

.output-card {
  background: #f8fafc;
  border: 1px solid #d9e0ea;
  border-radius: 14px;
  margin-top: 16px;
  padding: 14px 16px;
}

.output-title {
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

pre {
  margin: 0;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
