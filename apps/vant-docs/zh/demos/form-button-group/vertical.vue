<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  initialValues: {
    keyword: '垂直布局',
    remark: '默认更适合常规移动端表单',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`垂直布局提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <p class="demo-tip">
    适合表单页底部的主次操作堆叠展示。
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
    <FormButtonGroup>
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
