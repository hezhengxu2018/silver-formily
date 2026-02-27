<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Segmented, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Segmented,
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
        name="segmented"
        title="分段选择"
        x-decorator="FormItem"
        x-component="Segmented"
        :enum="[
          { label: '按天', value: 'day' },
          { label: '按周', value: 'week' },
          { label: '按月', value: 'month' },
        ]"
      />
      <SchemaStringField
        name="segmented-slot"
        title="插槽渲染"
        x-decorator="FormItem"
        x-component="Segmented"
        :enum="[
          { label: '立即', value: 'now' },
          { label: '今天', value: 'today' },
          { label: '本周', value: 'week' },
        ]"
        :x-content="{
          default: (props, { attrs }) => {
            const item = attrs.item
            return `插槽渲染-${typeof item === 'object' ? item.label : item}`
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
