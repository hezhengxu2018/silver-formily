<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormButtonGroup, FormItem, Input, Reset } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        required
        name="input1"
        title="Input"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        required
        title="Input"
        name="input2"
        x-decorator="FormItem"
        x-component="Input"
        default="123"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Reset validate force-clear @reset-validate-success="log">
        Reset
      </Reset>
    </FormButtonGroup>
  </FormProvider>
</template>



