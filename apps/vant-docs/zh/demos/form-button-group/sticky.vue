<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Input, Reset, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    name: 'Silver Formily',
    phone: '13800000000',
    city: '杭州',
    address: '西湖区文三路 88 号',
    remark: '继续向下滚动，按钮会吸附在底部',
  },
})

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values, '粘性布局提交结果')
}
</script>

<template>
  <p class="demo-tip">
    `FormButtonGroup.Sticky` 默认会吸附到底部，并优先把当前 `Form` 根节点作为边界容器。
  </p>

  <Form :form="form" label-width="4.5em" :on-auto-submit="handleSubmit">
    <Field
      name="name"
      title="姓名"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入姓名' }]"
    />
    <Field
      name="phone"
      title="手机"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入手机号' }]"
    />
    <Field
      name="city"
      title="城市"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入城市' }]"
    />
    <Field
      name="address"
      title="地址"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入详细地址' }]"
    />
    <Field
      name="remark"
      title="备注"
      :decorator="[FormItem]"
      :component="[Input.TextArea, { rows: 4, placeholder: '请输入备注' }]"
    />
    <Field
      name="backupPhone"
      title="备用手机"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入备用手机号' }]"
    />
    <Field
      name="contact"
      title="联系人"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入联系人' }]"
    />
    <Field
      name="note"
      title="补充说明"
      :decorator="[FormItem]"
      :component="[Input.TextArea, { rows: 3, placeholder: '请输入补充说明' }]"
    />

    <FormButtonGroup.Sticky :offset-bottom="0">
      <FormButtonGroup layout="horizontal">
        <Reset />
        <Submit />
      </FormButtonGroup>
    </FormButtonGroup.Sticky>
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
