<script lang="ts" setup>
import { createForm } from '@formily/core'
import { ColorPicker, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    ColorPicker,
  },
})

const predefineColors = [
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
]

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="color"
        title="基础用法"
        x-decorator="FormItem"
        x-component="ColorPicker"
        default="#409EFF"
      />
      <SchemaStringField
        name="color-alpha"
        title="透明度"
        x-decorator="FormItem"
        x-component="ColorPicker"
        :x-component-props="{
          showAlpha: true,
        }"
        default="rgba(255, 69, 0, 0.68)"
      />
      <SchemaStringField
        name="color-predefine"
        title="预设色值"
        x-decorator="FormItem"
        x-component="ColorPicker"
        :x-component-props="{
          predefine: predefineColors,
        }"
        default="#E02020"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
