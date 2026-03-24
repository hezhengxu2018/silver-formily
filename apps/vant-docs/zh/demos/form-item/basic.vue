<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    phone: '13800138000',
    remark: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="phone"
        title="手机号"
        required
        :decorator="[
          FormItem,
          {
            labelWidth: '5em',
            extra: 'labelWidth、required 仍走表单项壳层，extra 属性会显示在下方说明区',
          },
        ]"
        :component="[
          Input,
          {
            placeholder: '请输入手机号',
          },
        ]"
      />
      <Field
        name="remark"
        title="备注"
        :decorator="[
          FormItem,
          {
            labelAlign: 'top',
          },
        ]"
        :component="[
          Input.TextArea,
          {
            rows: 2,
            placeholder: '这里可以写一些补充信息',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>

