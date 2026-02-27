<script lang="ts" setup>
import { createForm } from '@formily/core'
import { ArrayCards, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()

const {
  SchemaField,
  SchemaArrayField,
  SchemaVoidField,
  SchemaStringField,
  SchemaObjectField,
} = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="string_array"
        :max-items="3"
        x-decorator="FormItem"
        x-component="ArrayCards"
        :x-component-props="{
          title: '字符串数组',
        }"
      >
        <SchemaVoidField>
          <SchemaVoidField x-component="ArrayCards.Index" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCards.Remove" />
          <SchemaVoidField x-component="ArrayCards.MoveUp" />
          <SchemaVoidField x-component="ArrayCards.MoveDown" />
        </SchemaVoidField>
        <SchemaVoidField x-component="ArrayCards.Addition" title="添加条目" />
      </SchemaArrayField>
      <SchemaArrayField
        name="array"
        :max-items="3"
        x-decorator="FormItem"
        x-component="ArrayCards"
        :x-component-props="{
          title: '对象数组',
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField x-component="ArrayCards.Index" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCards.Remove" />
          <SchemaVoidField x-component="ArrayCards.MoveUp" />
          <SchemaVoidField x-component="ArrayCards.MoveDown" />
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayCards.Addition" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
