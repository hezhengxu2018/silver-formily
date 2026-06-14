<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  ArrayTable,
  Editable,
  FormItem,
  Input,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElAlert, ElButton } from 'element-plus'

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
    Editable,
    Space,
  },
})

async function log(...v: Record<string, any>[]) {
  console.log(...v)
}

function range(count) {
  return Array.from({ length: count }).map(_ => ({ a1: null, a2: null, a3: null }))
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
          paginationProps: { pageSize: 10 },
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
            :x-component-props="{ prop: 'a1', title: 'A1', width: 200 }"
          >
            <SchemaStringField
              x-decorator="Editable"
              name="a1"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ title: 'A2', width: 200 }"
          >
            <SchemaStringField
              x-decorator="FormItem"
              :x-decorator-props="{
                feedbackLayout: 'popover',
              }"
              name="a2"
              :required="true"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ title: 'A3' }"
          >
            <SchemaStringField
              name="a3"
              :required="true"
              x-decorator="FormItem"
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
        <SchemaVoidField x-component="ArrayTable.Addition" :x-component-props="{ defaultValue: { a1: null, a2: '', a3: '' } }" title="Add Item" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
    <ElButton
      @click="
        () => {
          form.setInitialValues({
            array: range(100000),
          })
        }
      "
    >
      Load 100k Rows of Large Data
    </ElButton>
    <ElAlert
      :style="{ marginTop: '10px' }"
      title="Note: Pages with the Formily plugin enabled communicate with the backend and may consume more browser resources. Testing in incognito mode without the plugin is recommended."
      type="warning"
    />
  </FormProvider>
</template>



