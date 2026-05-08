<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, TreeSelect } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { categoryItems } from './shared'

const form = createForm({
  values: {
    city: 'hangzhou',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="city"
      title="城市"
      :decorator="[FormItem, { isLink: true }]"
      :component="[TreeSelect, { height: 320, title: '选择城市' }]"
      :data-source="categoryItems"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
