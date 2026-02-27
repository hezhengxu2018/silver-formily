<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  ArrayTable,
  Editable,
  FormItem,
  Input,
  Select,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()

const {
  SchemaField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaVoidField,
  SchemaStringField,
} = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Select,
    Editable,
    Space,
  },
})

async function log(...v) {
  console.log(...v)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="array"
        x-decorator="FormItem"
        x-component="ArrayTable"
        :x-component-props="{
          pagination: false,
          height: 300,
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ width: 80, title: 'Index' }"
          >
            <SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayTable.Index"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ prop: 'a1', title: 'A1' }"
          >
            <SchemaStringField
              x-decorator="Editable"
              name="a1"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ prop: 'a2', title: 'A2' }"
          >
            <SchemaStringField
              x-decorator="Editable"
              name="a2"
              x-component="Select"
              :x-decorator-props="{
                editProps: {
                  style: { width: '300px' },
                },
              }"
              :enum="[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]"
              default="option1"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{
              title: 'Operations',
              prop: 'operations',
              width: 200,
              fixed: 'right',
            }"
          >
            <SchemaVoidField x-component="FormItem">
              <SchemaVoidField x-component="Space" :x-component-props="{ style: 'height: 100%' }">
                <SchemaVoidField x-component="ArrayTable.Remove" />
                <SchemaVoidField x-component="ArrayTable.MoveUp" />
                <SchemaVoidField x-component="ArrayTable.MoveDown" />
              </SchemaVoidField>
            </SchemaVoidField>
          </SchemaVoidField>
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayTable.Addition" :x-component-props="{ defaultValue: { a1: null, a2: '', a3: '' } }" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
