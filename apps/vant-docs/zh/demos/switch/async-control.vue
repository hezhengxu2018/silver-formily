<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    asyncEnabled: true,
  },
})

interface AsyncSwitchField {
  value: boolean
  setValue: (value: boolean) => void
}

async function handleSwitchChange(field: AsyncSwitchField, nextValue: boolean) {
  const actionText = nextValue ? '开启' : '关闭'
  const confirmed = await Prompts.confirm(`确认将“异步开关”切换为${actionText}吗？`)

  if (confirmed) {
    field.setValue(nextValue)
  }
}
</script>

<template>
  <Form :form="form">
    <Field
      name="asyncEnabled"
      title="异步开关"
      :decorator="[FormItem]"
    >
      <template #default="{ field }">
        <Switch
          :model-value="Boolean(field.value)"
          @update:model-value="(value) => handleSwitchChange(field, Boolean(value))"
        />
      </template>
    </Field>

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
