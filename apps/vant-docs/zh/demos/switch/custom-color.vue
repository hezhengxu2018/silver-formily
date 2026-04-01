<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    branded: true,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="branded"
      title="自定义颜色"
      :decorator="[FormItem]"
      :component="[Switch, {
        activeColor: '#ee0a24',
        inactiveColor: '#dcdee0',
      }]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
