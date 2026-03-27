<script setup lang="ts">
import { createForm } from '@formily/core'
import { Cascader, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    deliveryRegion: ['zj', 'hz', 'xh'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="deliveryRegion"
      title="配送区域"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Cascader]"
      :data-source="cityOptions"
    />

    <Field
      name="backupRegion"
      title="备用区域"
      :decorator="[FormItem, { isLink: true }]"
      :component="[
        Cascader,
        {
          placeholder: '请选择备用区域',
        },
      ]"
      :data-source="cityOptions"
    />

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
