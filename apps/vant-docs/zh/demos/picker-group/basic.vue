<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, PickerGroup, PickerPanel, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'
import { appointmentOptions } from './shared'

const form = createForm({
  values: {
    appointment: ['sh', 'night'],
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="appointment"
      title="预约信息"
      :decorator="[FormItem, { isLink: true }]"
      :component="[PickerGroup]"
      :data-source="appointmentOptions"
    >
      <template #default="{ dataSource, panelProps }">
        <PickerPanel
          v-bind="panelProps[0]"
          :columns="dataSource[0].options"
        />
        <PickerPanel
          v-bind="panelProps[1]"
          :columns="dataSource[1].options"
        />
      </template>
    </Field>

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
