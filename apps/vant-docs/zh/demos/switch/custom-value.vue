<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    status: 'offline',
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="status"
      title="发布状态"
      :decorator="[FormItem]"
      :component="[Switch, {
        activeValue: 'online',
        inactiveValue: 'offline',
      }]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
