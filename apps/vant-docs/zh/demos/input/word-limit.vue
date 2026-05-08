<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    summary: '',
    remark: '已经支持字数统计和清空交互。',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="summary"
        title="简介"
        :decorator="[FormItem]"
        :component="[
          Input.TextArea,
          {
            rows: 2,
            maxlength: 40,
            showWordLimit: true,
            placeholder: '请输入 40 字以内的简介',
          },
        ]"
      />
      <Field
        name="remark"
        title="备注"
        :decorator="[FormItem]"
        :component="[
          Input.TextArea,
          {
            rows: 3,
            maxlength: 80,
            showWordLimit: true,
            clearable: true,
            placeholder: '可以继续补充更多说明',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
