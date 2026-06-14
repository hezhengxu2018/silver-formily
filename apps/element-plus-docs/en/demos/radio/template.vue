<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Radio, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="radio"
      title="Radio"
      :decorator="[FormItem]"
      :component="[Radio.Group]"
      :data-source="[
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
        },
      ]"
    />
    <Field
      name="radio-slot"
      title="Radio Slot"
      :component="[Radio.Group]"
      :decorator="[FormItem]"
      :data-source="[
        { label: 'Tag 1', value: '1' },
        { label: 'Tag 2', value: '2' },
      ]"
    >
      <template #option="{ option }">
        Rendered via slot: {{ option.label }}
      </template>
    </Field>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



