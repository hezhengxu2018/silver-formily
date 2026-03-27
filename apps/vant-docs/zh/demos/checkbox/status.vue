<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    disabledChannels: ['sms'],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="disabledChannels"
        title="禁用态"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Checkbox.Group, { disabled: true }]"
        :data-source="[
          { label: '短信提醒', value: 'sms' },
          { label: '邮件提醒', value: 'email' },
        ]"
      />

      <div class="status-tip">
        Vant 官方没有提供 `readonly` 版 Checkbox，这里保持和官方一致，只演示 `disabled` 场景。
      </div>
    </div>
  </FormProvider>
</template>

<style scoped>
.status-tip {
  margin-top: 12px;
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.6;
}
</style>
