<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Radio, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    deliveryType: 'express',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="deliveryType"
      title="配送方式"
      :decorator="[FormItem, { labelAlign: 'top' }]"
      :component="[Radio.Group]"
      :data-source="[
        { label: '快递寄送', value: 'express' },
        { label: '门店自提', value: 'pickup' },
        { label: '同城闪送', value: 'instant' },
      ]"
    />

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
