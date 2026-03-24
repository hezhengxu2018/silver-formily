<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  values: {
    keyword: 'Submit loading demo',
  },
})

async function handleSubmit(values: typeof form.values) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  await Prompts.alert(`异步提交完成\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <Form :form="form" label-width="4.5em">
    <Field
      name="keyword"
      title="关键词"
      :validator="{ required: true, message: '请输入关键词' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '点击提交后观察按钮 loading' }]"
    />
    <div class="demo-actions">
      <Submit
        loading-text="提交中..."
        :on-submit="handleSubmit"
      >
        异步提交
      </Submit>
    </div>
  </Form>
</template>

<style scoped>
.demo-actions {
  padding: 12px 16px 16px;
}
</style>
