<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, TimePicker } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    TimePicker,
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
        name="time"
        title="时间"
        required
        x-decorator="FormItem"
        x-component="TimePicker"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
      />
      <SchemaStringField
        name="[startTime, endTime]"
        title="时间范围"
        x-decorator="FormItem"
        x-component="TimePicker"
        :x-component-props="{
          isRange: true,
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
