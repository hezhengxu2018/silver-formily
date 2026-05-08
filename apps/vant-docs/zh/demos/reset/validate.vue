<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Reset } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    keyword: '表单重置',
  },
})

async function handleValidateSuccess(payload: unknown) {
  await showDemoResult(payload, '重置后校验通过')
}

async function handleValidateFailed(error: unknown) {
  await showDemoResult(error, '重置后校验失败')
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
    <FormButtonGroup>
      <Reset
        validate
        @reset-validate-success="handleValidateSuccess"
      >
        恢复并校验
      </Reset>
      <Reset
        type="danger"
        force-clear
        validate
        @reset-validate-failed="handleValidateFailed"
      >
        强制清空并校验
      </Reset>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.demo-tip {
  padding: 12px 16px 0;
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}
</style>
