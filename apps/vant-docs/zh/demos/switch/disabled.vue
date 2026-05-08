<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@sliver/formily-vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    enabled: false,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="enabled"
      title="禁用开关"
      :decorator="[FormItem]"
      :component="[Switch, { disabled: true }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
