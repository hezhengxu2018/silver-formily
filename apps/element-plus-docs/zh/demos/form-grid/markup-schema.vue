<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormGrid, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        x-component="FormGrid"
        :x-component-props="{
          maxColumns: 3,
          minColumns: 2,
        }"
      >
        <SchemaStringField
          name="aaa"
          title="aaa"
          x-decorator="FormItem"
          :x-decorator-props="{ 'data-grid-span': '2' }"
          x-component="Input"
        />
        <SchemaStringField
          name="bbb"
          title="bbb"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ccc"
          title="ccc"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ddd"
          title="ddd"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="eee"
          title="eee"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="fff"
          title="fff"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ggg"
          title="ggg"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaVoidField>
    </SchemaField>
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </FormProvider>
</template>
