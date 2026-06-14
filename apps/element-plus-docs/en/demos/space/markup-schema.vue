<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: { FormItem, FormLayout, Input, Space },
})

const form = createForm()

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="16">
      <SchemaField>
        <SchemaVoidField
          x-component="FormLayout"
          :x-component-props="{
            tag: 'div',
            labelCol: 6,
            wrapperCol: 10,
          }"
        >
          <SchemaVoidField
            title="Name"
            x-decorator="FormItem"
            :x-decorator-props="{
              asterisk: true,
              feedbackLayout: 'none',
            }"
            x-component="Space"
          >
            <SchemaStringField
              name="firstName"
              x-decorator="FormItem"
              x-component="Input"
              :required="true"
            />
            <SchemaStringField
              name="lastName"
              x-decorator="FormItem"
              x-component="Input"
              :required="true"
            />
          </SchemaVoidField>
          <SchemaVoidField
            title="Text Sequence"
            x-decorator="FormItem"
            :x-decorator-props="{
              asterisk: true,
              feedbackLayout: 'none',
            }"
            x-component="Space"
          >
            <SchemaStringField
              name="aa"
              x-decorator="FormItem"
              x-component="Input"
              :x-decorator-props="{
                addonAfter: 'Unit',
              }"
              :required="true"
            />
            <SchemaStringField
              name="bb"
              x-decorator="FormItem"
              x-component="Input"
              :x-decorator-props="{
                addonAfter: 'Unit',
              }"
              :required="true"
            />
            <SchemaStringField
              name="cc"
              x-decorator="FormItem"
              x-component="Input"
              :x-decorator-props="{
                addonAfter: 'Unit',
              }"
              :required="true"
            />
          </SchemaVoidField>
          <SchemaStringField
            name="textarea"
            title="Text Input"
            x-decorator="FormItem"
            :required="true"
            x-component="Input"
            :x-component-props="{
              style: {
                width: 400,
              },
              type: 'textarea',
            }"
          />
        </SchemaVoidField>
      </SchemaField>
      <FormButtonGroup align-form-item>
        <Submit @submit="log">
          Submit
        </Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>



