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
            label: 'Popular cities',
            options: [
              {
                value: 'Shanghai',
                label: 'Shanghai',
              },
              {
                value: 'Beijing',
                label: 'Beijing',
              },
            ],
          },
          {
            label: 'City name',
            disabled: true,
            options: [
              {
                value: 'Chengdu',
                label: 'Chengdu',
              },
              {
                value: 'Shenzhen',
                label: 'Shenzhen',
              },
              {
                value: 'Guangzhou',
                label: 'Guangzhou',
              },
              {
                value: 'Dalian',
                label: 'Dalian',
              },
            ],
          },
        ]"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



