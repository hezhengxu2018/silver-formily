<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Radio, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Radio,
  },
})

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="radio"
        title="单选"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :enum="[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]"
      />
      <SchemaStringField
        name="radio-slot"
        title="插槽单选"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :enum="[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]"
        :x-content="{
          option: (_, { attrs }) => {
            return `插槽渲染的${attrs.option.label}`
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
