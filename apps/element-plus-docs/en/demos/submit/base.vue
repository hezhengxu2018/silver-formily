<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  FormButtonGroup,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: { FormItem, Input },
})

const form = createForm()

async function log(v: Record<string, any>) {
  console.log(v)
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
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Submit @submit="log">
        Submit
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>



