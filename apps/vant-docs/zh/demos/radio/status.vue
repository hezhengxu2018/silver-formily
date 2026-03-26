<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Radio } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    disabledValue: 'wechat',
    readonlyValue: 'email',
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

      <Field
        name="readonlyValue"
        title="只读态"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Radio.Group, { readonly: true }]"
        :data-source="[
          { label: '邮箱提醒', value: 'email' },
          { label: '站内消息', value: 'site' },
        ]"
      />
    </div>
  </FormProvider>
</template>
