<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Segmented, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Segmented,
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
        name="segmented"
        title="Segmented"
        x-decorator="FormItem"
        x-component="Segmented"
        :enum="[
          { label: 'By Day', value: 'day' },
          { label: 'By Week', value: 'week' },
          { label: 'By Month', value: 'month' },
        ]"
      />
      <SchemaStringField
        name="segmented-slot"
        title="Slot Rendering"
        x-decorator="FormItem"
        x-component="Segmented"
        :enum="[
          { label: 'Now', value: 'now' },
          { label: 'Today', value: 'today' },
          { label: 'This Week', value: 'week' },
        ]"
        :x-content="{
          default: (props, { attrs }) => {
            const item = attrs.item
            return `Slot rendered - ${typeof item === 'object' ? item.label : item}`
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



