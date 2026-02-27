<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Mention, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Mention,
  },
})

const teammateOptions = [
  { value: 'Jasmine', label: 'Jasmine · 产品负责人' },
  { value: 'Leo', label: 'Leo · 交互设计' },
  { value: 'Mia', label: 'Mia · 前端开发' },
  { value: 'Oscar', label: 'Oscar · 测试同学' },
]

const topicOptions = [
  { value: '体验优化', label: '#体验优化' },
  { value: '周版本', label: '#周版本' },
  { value: '性能调优', label: '#性能调优' },
  { value: '风险提示', label: '#风险提示' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="status"
        title="团队动态"
        x-decorator="FormItem"
        x-component="Mention"
        default="今天和 @Jasmine 对齐了交互稿，准备同步 @Mia 进入联调。"
        :x-component-props="{
          rows: 3,
          placeholder: '输入 @ 召唤同事',
          options: teammateOptions,
        }"
      />
      <SchemaStringField
        name="timeline"
        title="带话题的更新"
        x-decorator="FormItem"
        x-component="Mention"
        :x-component-props="{
          rows: 3,
          prefix: ['@', '#'],
          split: ' ',
          placeholder: '支持同时输入 @ 同事或 # 话题',
          options: [...teammateOptions, ...topicOptions],
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
