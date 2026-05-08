<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { showToast } from 'vant'

const form = createForm({
  values: {
    keyword: 'Formily',
    captcha: '',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="keyword"
        title="搜索"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            leftIcon: 'search',
            clearable: true,
            placeholder: '输入关键词后可以直接清空',
          },
        ]"
      />
      <Field
        name="captcha"
        title="验证码"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            rightIcon: 'question-o',
            placeholder: '点击右侧图标查看说明',
            onClickRightIcon: () => showToast('验证码示例仅用于展示交互能力'),
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
