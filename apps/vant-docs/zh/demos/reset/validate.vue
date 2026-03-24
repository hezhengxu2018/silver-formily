<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Reset } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  initialValues: {
    keyword: '表单重置',
  },
})

async function handleValidateSuccess(payload: unknown) {
  await Prompts.alert(`重置后校验通过\n\n${JSON.stringify(payload, null, 2)}`)
}

async function handleValidateFailed(error: unknown) {
  await Prompts.alert(`重置后校验失败\n\n${JSON.stringify(error, null, 2)}`)
}
</script>

<template>
  <p class="demo-tip">
    第一个按钮会恢复初始值后再校验，第二个按钮会强制清空并触发失败回调。
  </p>

  <Form :form="form" label-width="4.5em">
    <Field
      name="keyword"
      title="关键词"
      :validator="{ required: true, message: '请输入关键词' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入关键词' }]"
    />
    <div class="demo-actions">
      <Reset
        validate
        :on-reset-validate-success="handleValidateSuccess"
      >
        恢复并校验
      </Reset>
      <Reset
        type="danger"
        force-clear
        validate
        :on-reset-validate-failed="handleValidateFailed"
      >
        强制清空并校验
      </Reset>
    </div>
  </Form>
</template>

<style scoped>
.demo-tip {
  padding: 12px 16px 0;
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}

.demo-actions {
  display: grid;
  gap: 12px;
  padding: 12px 16px 16px;
}
</style>
