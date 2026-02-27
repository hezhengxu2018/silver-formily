<script lang="ts" setup>
import { createForm } from '@formily/core'
import { Autocomplete, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Autocomplete,
  },
})

const cityOptions = [
  { value: '北京' },
  { value: '上海' },
  { value: '广州' },
  { value: '深圳' },
  { value: '杭州' },
  { value: '成都' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="city"
        title="常用城市"
        x-decorator="FormItem"
        x-component="Autocomplete"
        :x-component-props="{
          triggerOnFocus: true,
          placeholder: '请输入或选择城市',
          style: { width: '260px' },
        }"
        :enum="cityOptions"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
