<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  values: {
    username: 'silver-formily',
    bio: '正在为 Vant 做最小基础封装',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
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
      <div class="demo-actions">
        <button class="demo-submit" type="submit">
          提交
        </button>
      </div>
    </div>
  </Form>
</template>

<style scoped>
.demo-panel {
  overflow: hidden;
  border-radius: 12px;
  background: var(--van-background-2);
}

.demo-actions {
  padding: 12px 16px 16px;
}

.demo-submit {
  width: 100%;
  padding: 10px 16px;
  color: var(--van-white);
  background: var(--van-primary-color);
  border: 0;
  border-radius: 999px;
}
</style>
