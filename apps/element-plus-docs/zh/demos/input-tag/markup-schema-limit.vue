<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, InputTag, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    InputTag,
  },
})

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="roles"
        title="限制数量"
        x-decorator="FormItem"
        x-component="InputTag"
        :default="['前端', '体验设计']"
        :x-component-props="{
          placeholder: '最多 3 个标签',
          max: 3,
          clearable: true,
          collapseTags: true,
          collapseTagsTooltip: true,
          maxCollapseTags: 1,
        }"
      />
      <SchemaArrayField
        name="shortcuts"
        title="自定义触发"
        x-decorator="FormItem"
        x-component="InputTag"
        :x-component-props="{
          placeholder: '按空格或输入逗号添加',
          trigger: 'Space',
          delimiter: ',',
          saveOnBlur: true,
          draggable: true,
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
