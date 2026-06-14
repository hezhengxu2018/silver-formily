<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Checkbox, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { ArrayField, Field } from '@silver-formily/vue'

const form = createForm()

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="single"
      title="Confirm"
      :decorator="[FormItem]"
      :component="[Checkbox]"
    />
    <ArrayField
      name="multiple"
      title="Checkbox"
      :data-source="[
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ]"
      :decorator="[FormItem]"
      :component="[Checkbox.Group, { optionType: 'button' }]"
    />
    <ArrayField
      name="multiple-slot"
      title="Checkbox with Slot"
      :data-source="[
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ]"
      :decorator="[FormItem]"
      :component="[Checkbox.Group, { optionType: 'button' }]"
    >
      <template #option="{ option }">
        <div>Rendered via slot: {{ option.label }}</div>
      </template>
    </ArrayField>
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



