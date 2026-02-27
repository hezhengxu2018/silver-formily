<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Rate, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaNumberField } = createSchemaField({
  components: {
    FormItem,
    Rate,
  },
})

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaNumberField
        name="rate"
        title="评分"
        x-decorator="FormItem"
        x-component="Rate"
      />
      <SchemaNumberField
        name="rate-half"
        title="半星评分"
        x-decorator="FormItem"
        x-component="Rate"
        :x-component-props="{
          allowHalf: true,
        }"
      />
      <SchemaNumberField
        name="rate-text"
        title="显示文字"
        x-decorator="FormItem"
        x-component="Rate"
        :x-component-props="{
          showText: true,
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
