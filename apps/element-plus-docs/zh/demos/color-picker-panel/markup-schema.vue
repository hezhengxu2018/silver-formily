<script lang="ts" setup>
import { createForm } from '@formily/core'
import { ColorPickerPanel, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

const form = createForm()
const predefine = ['#409eff', '#67c23a', '#e6a23c', 'rgba(255, 69, 0, 0.68)']
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    ColorPickerPanel,
  },
})

async function onSubmit(value: any) {
  console.log(value)
}
</script>

<template>
  <Form :form="form" layout="vertical">
    <SchemaField>
      <SchemaStringField
        name="primary"
        title="主题色"
        x-decorator="FormItem"
        x-component="ColorPickerPanel"
        :x-component-props="{
          style: 'width: 320px',
          predefine,
        }"
      />
      <SchemaStringField
        name="alpha"
        title="透明主题色"
        x-decorator="FormItem"
        x-component="ColorPickerPanel"
        :x-component-props="{
          showAlpha: true,
          style: 'width: 320px',
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
