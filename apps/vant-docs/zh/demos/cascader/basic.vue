<script setup lang="ts">
import { createForm } from '@formily/core'
import { Cascader, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    area: ['330000', '330100', '330106'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="area"
      title="所在地区"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Cascader]"
      :data-source="cityOptions"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
