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

function sleep(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

async function handleBeforeChange(nextValue: boolean) {
  const actionText = nextValue ? '开启' : '关闭'
  const confirmed = await Prompts.confirm(`确认将“异步开关”切换为${actionText}吗？`)

  if (!confirmed) {
    return false
  }

  await sleep(600)
  return true
}
</script>

<template>
  <Form :form="form">
    <Field
      name="asyncEnabled"
      title="异步开关"
      :decorator="[FormItem]"
      :component="[Switch, {
        beforeChange: handleBeforeChange,
      }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
