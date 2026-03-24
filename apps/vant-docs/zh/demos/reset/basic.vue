<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Reset } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  initialValues: {
    nickname: 'silver-formily',
    city: '杭州',
  },
})
</script>

<template>
  <p class="demo-tip">
    先修改下面的输入内容，再点击重置按钮，可以看到字段值恢复到初始值。
  </p>

  <Form :form="form" label-width="4.5em">
    <Field
      name="nickname"
      title="昵称"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入昵称' }]"
    />
    <Field
      name="city"
      title="城市"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入城市' }]"
    />
    <div class="demo-actions">
      <Reset />
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
  padding: 12px 16px 16px;
}
</style>
