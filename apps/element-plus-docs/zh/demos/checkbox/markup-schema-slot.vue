<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Checkbox, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { Fragment, h } from 'vue'

const form = createForm()
const { SchemaField, SchemaBooleanField, SchemaArrayField } = createSchemaField(
  {
    components: {
      FormItem,
      Checkbox,
    },
  },
)

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="single"
        title="是否确认"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaArrayField
        name="multiple"
        title="复选"
        :enum="[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
        :x-content="{
          option: (props, { attrs }) => {
            return h(Fragment, [`使用插槽渲染的${attrs.option.label}`])
          },
        }"
      />
    </SchemaField>
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
