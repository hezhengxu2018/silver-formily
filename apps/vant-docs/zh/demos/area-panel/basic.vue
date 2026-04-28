<script setup lang="ts">
import { createForm } from '@formily/core'
import { AreaPanel, Form, FormButtonGroup, Submit } from '@silver-formily/vant'
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
      :component="[AreaPanel, { areaList }]"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
