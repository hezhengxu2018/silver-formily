<script lang="ts" setup>
import { createForm, isField } from '@silver-formily/core'
import {
  DatePicker,
  Editable,
  FormButtonGroup,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { Field, FormProvider, ObjectField, VoidField } from '@silver-formily/vue'

const form = createForm()

async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="date"
      title="Date"
      :decorator="[Editable]"
      :component="[DatePicker]"
    />
    <Field
      name="input"
      title="Input"
      :decorator="[Editable]"
      :component="[Input]"
    />
    <VoidField
      name="void"
      title="Virtual Node Container"
      :component="[Editable.Popover]"
      :reactions="
        (field) => {
          field.title = field.query('.void.date2').get('value') || field.title
        }
      "
    >
      <Field
        name="date2"
        title="Date"
        :decorator="[FormItem]"
        :component="[DatePicker]"
      />
      <Field
        name="input2"
        title="Input"
        :decorator="[FormItem]"
        :component="[Input]"
      />
    </VoidField>
    <ObjectField
      name="iobject"
      title="Object Node Container"
      :component="[Editable.Popover]"
      :reactions="
        (field) => {
          isField(field)
            && (field.title = (field.value && field.value.date) || field.title)
        }
      "
    >
      <Field
        name="date"
        title="Date"
        :decorator="[FormItem]"
        :component="[DatePicker]"
      />
      <Field
        name="input"
        title="Input"
        :decorator="[FormItem]"
        :component="[Input]"
      />
    </ObjectField>
    <Field
      name="disabled"
      title="Disabled"
      :decorator="[Editable]"
      :component="[Input]"
      initial-value="Disabled Editable"
      :disabled="true"
    />
    <FormButtonGroup>
      <Submit @submit="log">
        Submit
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



