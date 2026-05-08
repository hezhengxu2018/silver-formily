<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, Form, FormButtonGroup, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    agreement: true,
    subscribe: false,
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <div class="checkbox-stack">
      <Field name="agreement" :component="[Checkbox]">
        我已阅读并同意《服务协议》
      </Field>

      <Field
        name="subscribe"
        :component="[Checkbox, { shape: 'square' }]"
      >
        接收新品上架与活动提醒
      </Field>
    </div>

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.checkbox-stack {
  display: grid;
  gap: 14px;
  padding: 4px 16px 0;
}
</style>
