<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@sliver/formily-vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    enabled: true,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="enabled"
      title="是否启用"
      :decorator="[FormItem]"
      :component="[Switch]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
