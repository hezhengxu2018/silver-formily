<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Select,
  },
})

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="Select"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
        :enum="[
          {
            label: 'Option 1',
            value: 1,
          },
          {
            label: 'Option 2',
            value: 2,
          },
        ]"
        :x-content="{
          option: (props, { attrs }) => `${attrs.option?.label}-${attrs.option?.value}`,
        }"
      />

      <SchemaStringField
        name="select2"
        title="Select 2"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
        :enum="[
          {
            label: 'Option 1',
            value: 1,
          },
          {
            label: 'Option 2',
            value: 2,
          },
        ]"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



