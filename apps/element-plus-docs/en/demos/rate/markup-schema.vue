<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Rate, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaNumberField } = createSchemaField({
  components: {
    FormItem,
    Rate,
  },
})

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaNumberField
        name="rate"
        title="Rate"
        x-decorator="FormItem"
        x-component="Rate"
      />
      <SchemaNumberField
        name="rate-half"
        title="Half-star Rating"
        x-decorator="FormItem"
        x-component="Rate"
        :x-component-props="{
          allowHalf: true,
        }"
      />
      <SchemaNumberField
        name="rate-text"
        title="Show Text"
        x-decorator="FormItem"
        x-component="Rate"
        :x-component-props="{
          showText: true,
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



