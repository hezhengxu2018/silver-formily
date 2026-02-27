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
        name="skills"
        title="技术标签"
        x-decorator="FormItem"
        x-component="InputTag"
        :default="['Vue', 'TypeScript']"
        :x-component-props="{
          placeholder: '输入后按 Enter 添加',
        }"
      />
      <SchemaArrayField
        name="frameworks"
        title="感兴趣的框架"
        x-decorator="FormItem"
        x-component="InputTag"
        :x-component-props="{
          placeholder: '允许重复，自动去除空白',
          saveOnBlur: false,
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
