<script setup lang="ts">
import { createForm } from '@formily/core'
import { RichText } from '@silver-formily/tiptap'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '这一例使用 JSON 作为字段值。',
            },
          ],
        },
      ],
    },
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
              output: 'json',
              placeholder: '这里会输出结构化 JSON',
              minHeight: 160,
            },
          ]"
        />
        <FormConsumer>
          <template #default="{ form: consumerForm }">
            <div class="demo-card">
              <div class="demo-title">
                当前 JSON 输出
              </div>
              <pre>{{ JSON.stringify(consumerForm.values.content, null, 2) }}</pre>
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
}
</style>
