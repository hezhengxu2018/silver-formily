<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  ArrayTable,
  Editable,
  FormItem,
  Input,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

function range(count) {
  return Array.from({ length: count }).map((_, index) => ({ a1: index }))
}

const form = createForm({
  initialValues: {
    array: range(30),
  },
})

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
          stripe: true,
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ width: 60 }"
          >
            <SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayTable.SortHandle"
            />
          </SchemaVoidField>
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
