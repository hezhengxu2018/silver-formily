<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Radio, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Radio,
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
        name="radio"
        title="Radio"
        x-decorator="FormItem"
        x-component="Radio.Group"
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
      <SchemaStringField
        name="radio-slot"
        title="Slot-based Radio"
        x-decorator="FormItem"
        x-component="Radio.Group"
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
          option: (_, { attrs }) => {
            return `Slot rendered ${attrs.option.label}`
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



