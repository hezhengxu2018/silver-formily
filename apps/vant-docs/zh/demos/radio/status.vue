<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Radio } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    disabledValue: 'wechat',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="disabledValue"
        title="禁用态"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Radio.Group, { disabled: true }]"
        :data-source="[
          { label: '微信通知', value: 'wechat' },
          { label: '短信通知', value: 'sms' },
        ]"
      />
    </div>
  </FormProvider>
</template>
