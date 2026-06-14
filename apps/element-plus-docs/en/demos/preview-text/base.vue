<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, FormLayout, PreviewText } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField, SchemaNumberField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    PreviewText,
  },
})

const form = createForm()
</script>

<template>
  <FormLayout :label-col="6" :wrapper-col="10">
    <FormProvider :form="form">
      <SchemaField>
        <SchemaStringField
          x-decorator="FormItem"
          title="Text Preview"
          x-component="PreviewText.Input"
          default="Hello world"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Option Preview"
          x-component="PreviewText.Select"
          :x-component-props="{
            multiple: true,
          }"
          :default="['123', '222']"
          :enum="[
            { label: 'A111', value: '123' },
            {
              label: 'A222',
              value: '222',
            },
          ]"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Date Preview"
          x-component="PreviewText.DatePicker"
          default="2020-11-23 22:15:20"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Time Preview"
          x-component="PreviewText.TimePicker"
          :default="['2020-11-23 22:15:20', '2020-11-23 23:15:20']"
        />
        <SchemaNumberField
          x-decorator="FormItem"
          title="Rate Preview"
          x-component="PreviewText.Rate"
          :x-component-props="{
            allowHalf: true,
            showText: true,
          }"
          :default="3.5"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Color Preview"
          x-component="PreviewText.ColorPicker"
          default="#409EFF"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Cascader Preview"
          x-component="PreviewText.Cascader"
          :default="['hangzhou', 'yuhang']"
          :enum="[
            { label: 'Hangzhou', value: 'hangzhou' },
            { label: 'Yuhang', value: 'yuhang' },
          ]"
        />
      </SchemaField>
    </FormProvider>
  </FormLayout>
</template>



