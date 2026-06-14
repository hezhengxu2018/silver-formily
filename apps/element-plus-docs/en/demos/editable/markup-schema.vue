<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  DatePicker,
  Editable,
  FormButtonGroup,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField, SchemaStringField, SchemaVoidField, SchemaObjectField }
  = createSchemaField({
    components: {
      FormItem,
      Input,
      DatePicker,
      Editable,
    },
  })

const form = createForm()

async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="date"
        title="Date"
        x-decorator="Editable"
        x-component="DatePicker"
      />
      <SchemaStringField
        name="input"
        title="Input"
        x-decorator="Editable"
        x-component="Input"
      />
      <SchemaVoidField
        name="void"
        title="Virtual Node Container"
        x-component="Editable.Popover"
        :x-reactions="
          (field) => {
            field.title = field.query('.void.date2').get('value') || field.title
          }
        "
      >
        <SchemaStringField
          name="date2"
          title="Date"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
        <SchemaStringField
          name="input2"
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaVoidField>
      <SchemaObjectField
        name="object"
        title="Object Node Container"
        x-component="Editable.Popover"
        :x-reactions="
          (field) => {
            field.title = (field.value && field.value.date) || field.title
          }
        "
      >
        <SchemaStringField
          name="date"
          title="Date"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
        <SchemaStringField
          name="input"
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaObjectField>
    </SchemaField>
    <FormButtonGroup>
      <Submit @submit="log">
        Submit
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



