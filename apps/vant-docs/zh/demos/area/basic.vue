<script setup lang="ts">
import { createForm } from '@formily/core'
import { Area, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { areaList } from '@vant/area-data'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    areaCode: '330102',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="areaCode"
      title="省市区"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Area, { areaList }]"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
