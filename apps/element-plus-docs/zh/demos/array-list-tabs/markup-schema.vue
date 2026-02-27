<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
import { createForm } from '@formily/core'
import {
  ArrayListTabs,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const {
  SchemaField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaStringField,
  SchemaVoidField,
} = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayListTabs,
  },
})
const form = createForm()

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="array"
        x-decorator="FormItem"
        x-component="ArrayListTabs"
        :x-component-props="{
          tabTitleField: 'input',
        }"
        :x-validator="{
          max: 5,
        }"
      >
        <SchemaObjectField>
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="input"
            x-component="Input"
            :x-component-props="{
              placeholder: '请输入Input',
            }"
            :x-validator="[{ required: true }]"
          />
          <SchemaStringField
            name="input2"
            x-decorator="FormItem"
            title="input2"
            x-component="Input"
          />
          <SchemaVoidField
            x-component="ArrayListTabs.Remove"
            :x-component-props="{
              icon: Close,
            }"
          />
        </SchemaObjectField>
        <SchemaVoidField
          x-component="ArrayListTabs.Addition"
          title="添加条目"
        />
      </SchemaArrayField>
    </SchemaField>
    <Submit style="margin-top: 30px;" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
