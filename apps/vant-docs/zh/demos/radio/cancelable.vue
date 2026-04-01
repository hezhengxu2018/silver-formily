<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Radio, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'

const form = createForm({
  values: {
    reminderChannel: 'sms',
  },
})

const reminderOptions = [
  {
    label: '短信提醒',
    value: 'sms',
  },
  {
    label: '电话提醒',
    value: 'phone',
  },
  {
    label: '站内消息',
    value: 'site',
  },
]

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <Form :form="form">
    <div class="demo-tip">
      当前示例开启了 <code>cancelable</code>，再次点击已选中的选项会把字段值清空。
    </div>

    <Field
      name="reminderChannel"
      title="提醒方式"
      :decorator="[FormItem, { labelAlign: 'top' }]"
      :component="[Radio.Group, { cancelable: true, direction: 'vertical' }]"
      :data-source="reminderOptions"
    />

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.demo-tip {
  margin: 0 0 12px;
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.6;
}
</style>
