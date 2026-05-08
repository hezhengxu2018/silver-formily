<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    username: 'silver-formily',
    bio: '正在为 Vant 做最小基础封装',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form" label-width="4.5em" :on-auto-submit="handleSubmit">
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
      <FormButtonGroup>
        <Submit />
      </FormButtonGroup>
    </div>
  </Form>
</template>

<style scoped>
.demo-panel {
  overflow: hidden;
  border-radius: 12px;
  background: var(--van-background-2);
}
</style>
