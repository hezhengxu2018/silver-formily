<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@sliver/formily-vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    syncing: true,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="syncing"
      title="加载状态"
      loading
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
