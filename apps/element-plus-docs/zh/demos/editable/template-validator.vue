<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  DatePicker,
  Editable,
  FormButtonGroup,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { Field, FormProvider, ObjectField, VoidField } from '@silver-formily/vue'

const form = createForm()

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[Editable]"
      :component="[Input]"
      validator="email"
    />
    <VoidField
      name="void"
      title="虚拟节点容器"
      :component="[Editable.Popover]"
      :reactions="
        (field) => {
          field.title = field.query('.void.date2').get('value') || field.title
        }
      "
    >
      <Field
        name="date2"
        title="日期"
        :decorator="[FormItem]"
        :component="[DatePicker]"
      />
      <Field
        name="input2"
        title="输入框"
        :decorator="[FormItem]"
        :component="[Input]"
        validator="email"
      />
    </VoidField>
    <ObjectField
      name="iobject"
      title="对象节点容器"
      :component="[Editable.Popover]"
      :reactions="
        (field) => {
          field.title = (field.value && field.value.date) || field.title
        }
      "
    >
      <Field
        name="date"
        title="日期"
        :decorator="[FormItem]"
        :component="[DatePicker]"
      />
      <Field
        name="input"
        title="输入框"
        :decorator="[FormItem]"
        :component="[Input]"
        :validator="[{ required: true }, 'email']"
      />
    </ObjectField>

    <FormButtonGroup>
      <Submit @submit="log">
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
