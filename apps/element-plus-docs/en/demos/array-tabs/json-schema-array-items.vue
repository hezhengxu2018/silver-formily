<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  ArrayTabs,
  DatePicker,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    DatePicker,
    ArrayTabs,
  },
})

const form = createForm({
  initialValues: {
    string_array: ['', ''],
  },
})
const schema = {
  type: 'object',
  properties: {
    string_array: {
      'type': 'array',
      'title': 'String Array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTabs',
      'items': [
        {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'Enter text',
          },
        },
        {
          'type': 'string',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            placeholder: 'Select a date',
          },
        },
      ],
    },
  },
}

async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



