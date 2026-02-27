<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Submit, TimeSelect } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    TimeSelect,
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
        x-component="TimeSelect"
        :x-component-props="{
          style: {
            width: '240px',
          },
          start: '00:00',
          step: '00:30',
          end: '23:59',
          placeholder: 'Select time',
          format: 'hh:mm A',
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
