<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { Cascader, FormItem } from '@sliver/formily-vant'
import { customFieldOptions, fieldNames } from './shared'

const form = createForm({
  values: {
    areaCode: ['330000', '330100'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="areaCode"
        title="自定义字段名"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Cascader,
          {
            fieldNames,
          },
        ]"
        :data-source="customFieldOptions"
      />
    </div>
  </FormProvider>
</template>
