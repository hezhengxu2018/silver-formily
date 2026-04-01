<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    compact: true,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="compact"
      title="自定义大小"
      :decorator="[FormItem]"
      :component="[Switch, { size: '22px' }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
