<script setup lang="ts">
import { createForm } from '@formily/core'
import { RichText } from '@silver-formily/tiptap'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    content: `
      <h3>预览态示例</h3>
      <p>这一块演示 <code>readPretty</code> 模式下的展示效果。</p>
      <blockquote>适合详情页、审批页、表单回显等场景。</blockquote>
      <ul>
        <li>支持段落</li>
        <li>支持列表</li>
        <li>支持代码块</li>
      </ul>
    `,
  },
})
</script>

<template>
  <ClientOnly>
    <FormProvider :form="form">
      <Field
        name="content"
        pattern="readPretty"
        :component="[
          RichText,
          {
            output: 'html',
          },
        ]"
      />
    </FormProvider>
  </ClientOnly>
</template>
