<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Slider, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaArrayField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Slider,
  },
})

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="slider"
        title="滑块"
        x-decorator="FormItem"
        x-component="Slider"
        :x-component-props="{
          style: {
            width: '240px',
          },
          showInput: true,
        }"
        :default="30"
      />
      <SchemaArrayField
        name="slider-range"
        title="区间与刻度"
        x-decorator="FormItem"
        x-component="Slider"
        :x-component-props="{
          style: {
            width: '240px',
          },
          range: true,
          marks: {
            0: '0',
            20: '20',
            40: '40',
            60: '60',
            80: '80',
            100: '100',
          },
        }"
        :default="[20, 60]"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
