<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Segmented, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="segmented"
      title="Segmented"
      :decorator="[FormItem]"
      :component="[Segmented]"
      :data-source="[
        { label: 'By Day', value: 'day' },
        { label: 'By Week', value: 'week' },
        { label: 'By Month', value: 'month' },
      ]"
    />
    <Field
      name="segmented-slot"
      title="Slot Rendering"
      :decorator="[FormItem]"
      :component="[Segmented]"
      :data-source="[
        { label: 'Now', value: 'now' },
        { label: 'Today', value: 'today' },
        { label: 'This Week', value: 'week' },
      ]"
    >
      <template #default="{ item }">
        Custom {{ typeof item === 'object' ? item.label : item }}
      </template>
    </Field>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



