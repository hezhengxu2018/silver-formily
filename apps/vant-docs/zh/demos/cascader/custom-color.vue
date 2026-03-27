<script setup lang="ts">
import { createForm } from '@formily/core'
import { Cascader, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    area: ['320000', '320100', '320106'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="area"
        title="自定义颜色"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Cascader,
          {
            activeColor: '#ee0a24',
          },
        ]"
        :data-source="cityOptions"
      />
    </div>
  </FormProvider>
</template>
