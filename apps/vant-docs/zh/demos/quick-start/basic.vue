<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Input } from '@silver-formily/vant'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    username: 'silver-formily',
    bio: '正在为 Vant 做最小基础封装',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="username"
        title="用户名"
        :decorator="[FormItem]"
        :component="[
          Input,
          {
            placeholder: '请输入用户名',
          },
        ]"
      />
      <Field
        name="bio"
        title="简介"
        :decorator="[
          FormItem,
          {
            extra: 'FormItem 负责壳层，Input 负责值输入',
          },
        ]"
        :component="[
          Input.TextArea,
          {
            rows: 3,
            placeholder: '介绍一下当前这版封装',
          },
        ]"
      />
    </div>

    <FormConsumer>
      <template #default="{ form: consumerForm }">
        <pre class="demo-result">{{ JSON.stringify(consumerForm.values, null, 2) }}</pre>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<style scoped>
.demo-panel {
  overflow: hidden;
  border-radius: 12px;
  background: var(--van-background-2);
}

.demo-result {
  margin-top: 16px;
  padding: 12px;
  overflow: auto;
  color: var(--van-text-color);
  background: var(--van-gray-1);
  border-radius: 12px;
}
</style>
