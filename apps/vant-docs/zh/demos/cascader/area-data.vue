<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Cascader, Form, FormButtonGroup, FormItem, Submit } from '@sliver/formily-vant'
import { useCascaderAreaData } from '@vant/area-data'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    areaCode: null,
  },
})

const areaOptions = useCascaderAreaData()

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
      :component="[Cascader]"
      :data-source="areaOptions"
    />

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
