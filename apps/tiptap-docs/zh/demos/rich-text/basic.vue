<script setup lang="ts">
import { createForm } from '@formily/core'
import { RichText } from '@silver-formily/tiptap'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    content: '<p>这是一段 <strong>默认内容</strong>，你可以直接编辑它。</p>',
  },
})
</script>

<template>
  <ClientOnly>
    <FormProvider :form="form">
      <div class="demo-stack">
        <Field
          name="content"
          title="内容"
          :component="[
            RichText,
            {
              placeholder: '请输入文章正文',
              output: 'html',
            },
          ]"
        />
        <FormConsumer>
          <template #default="{ form: consumerForm }">
            <div class="demo-card">
              <div class="demo-title">
                当前 HTML 输出
              </div>
              <pre>{{ consumerForm.values.content }}</pre>
            </div>
          </template>
        </FormConsumer>
      </div>
    </FormProvider>
  </ClientOnly>
</template>

<style scoped>
.demo-stack {
  display: grid;
  gap: 16px;
}

.demo-card {
  background: #f8fafc;
  border: 1px solid #d9e0ea;
  border-radius: 12px;
  padding: 14px 16px;
}

.demo-title {
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
</style>
