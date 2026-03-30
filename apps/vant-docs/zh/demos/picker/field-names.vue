<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Picker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { customFieldColumns, customFieldNames } from './shared'

const form = createForm({
  values: {
    scene: ['travel', 'flight'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="scene"
        title="出行方案"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Picker,
          {
            columnsFieldNames: customFieldNames,
          },
        ]"
        :data-source="customFieldColumns"
      />
    </div>
  </FormProvider>
</template>
