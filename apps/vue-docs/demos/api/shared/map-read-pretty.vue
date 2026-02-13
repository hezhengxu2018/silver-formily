<script setup lang="ts">
import type { Field as FieldType } from '@formily/core'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  connect,
  Field,
  FormProvider,
  mapProps,
  mapReadPretty,
} from '@silver-formily/vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'

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
    (props, field: FieldType) => ({
      ...props,
      help: field.selfErrors?.length ? field.selfErrors : undefined,
    }),
  ),
)

const ReadPrettyInput = defineComponent({
  name: 'ReadPrettyInput',
  setup(_props, { attrs }) {
    return () => h('div', {}, [attrs.modelValue as any])
  },
})

const Input = connect(
  ElInput,
  mapReadPretty(ReadPrettyInput),
)

const form = createForm({ validateFirst: true, readPretty: true })
</script>

<template>
  <FormProvider :form="form">
    <ElForm layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        initial-value="Hello world"
        :decorator="[FormItem]"
        :component="[Input, { placeholder: 'Please ElInput' }]"
      />
    </ElForm>
  </FormProvider>
</template>
