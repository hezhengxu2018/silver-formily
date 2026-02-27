<script lang="ts" setup>
import { createForm } from '@formily/core'
import { DatePickerPanel, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    DatePickerPanel,
  },
})

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" layout="vertical">
    <SchemaField>
      <SchemaStringField
        name="inlineDate"
        title="内联日期"
        x-decorator="FormItem"
        x-component="DatePickerPanel"
        :x-component-props="{ style: 'width: 340px' }"
      />
      <SchemaArrayField
        name="inlineRange"
        title="内联范围"
        x-decorator="FormItem"
        x-component="DatePickerPanel"
        :x-component-props="{
          type: 'daterange',
          style: 'width: 540px',
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
