<script setup lang="ts">
import type { Field as TypeField } from '@formily/core'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  connect,
  Field,
  FormConsumer,
  FormProvider,
  mapProps,
} from '@silver-formily/vue'
import { ElButton, ElFormItem, ElInput } from 'element-plus'

setValidateLanguage('en')

const FormItem = connect(
  ElFormItem,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field: TypeField) => ({
      ...props,
      help: field.selfErrors?.length ? field.selfErrors : undefined,
    }),
  ),
)

const form = createForm({ validateFirst: true })

function log(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(...args)
}

function handleSubmit() {
  form.submit(log)
}
</script>

<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        :decorator="[FormItem]"
        :component="[ElInput, { placeholder: 'Please ElInput' }]"
      />
      <FormConsumer>
        <template #default="{ form: _form }">
          <div style="white-space: pre; margin-bottom: 16px">
            {{ JSON.stringify(_form.values, null, 2) }}
          </div>
          <ElButton type="primary" @click="handleSubmit">
            Submit
          </ElButton>
        </template>
      </FormConsumer>
    </Form>
  </FormProvider>
</template>
