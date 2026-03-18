<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    keyword: '',
    description: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="keyword"
        title="关键词"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            clearable: true,
            placeholder: '支持最基础的文本输入',
          },
        ]"
      />
      <Field
        name="description"
        title="详细描述"
        :decorator="[FormItem]"
        :component="[
          Input.TextArea,
          {
            rows: 4,
            maxlength: 120,
            showWordLimit: true,
            placeholder: 'TextArea 也是同一套输入组件的扩展',
          },
        ]"
      />
    </div>
  </FormProvider>
</template>

