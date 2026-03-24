<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  initialValues: {
    keyword: '水平布局',
    remark: '适合两个主操作并排展示',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`水平布局提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <p class="demo-tip">
    两个按钮会并排拉伸，占据同一行。
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
    <FormButtonGroup layout="horizontal">
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
