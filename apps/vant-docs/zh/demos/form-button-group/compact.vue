<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  initialValues: {
    keyword: '紧凑布局',
    remark: '复用了 ActionBar 的紧凑圆角按钮样式',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`紧凑布局提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <p class="demo-tip">
    `Reset` 和 `Submit` 会自动切到 ActionBar 风格的紧凑按钮，并通过主色边框增强默认白底按钮的辨识度。
  </p>

  <Form :form="form" label-width="4.5em" :on-auto-submit="handleSubmit">
    <Field
      name="keyword"
      title="关键词"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入关键词' }]"
    />
    <Field
      name="remark"
      title="说明"
      :decorator="[FormItem]"
      :component="[Input.TextArea, { rows: 2, placeholder: '请输入说明' }]"
    />
    <FormButtonGroup layout="compact">
      <Reset />
      <Submit />
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.demo-tip {
  padding: 12px 16px 0;
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}
</style>
