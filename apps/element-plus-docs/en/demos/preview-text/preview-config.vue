<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  Cascader,
  DatePicker,
  Form,
  FormButtonGroup,
  FormItem,
  Input,
  PreviewText,
  Select,
  TimePicker,
} from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField, SchemaStringField, SchemaVoidField } = createSchemaField({
  components: {
    PreviewText,
    FormItem,
    Input,
    Select,
    DatePicker,
    Cascader,
    TimePicker,
  },
})

const form = createForm({ readPretty: true })
</script>

<template>
  <Form
    :label-col="6"
    :wrapper-col="10"
    :form="form"
  >
    <SchemaField>
      <SchemaVoidField
        x-component="PreviewText"
        :x-component-props="{
          placeholder: 'Custom Empty Placeholder',
        }"
      >
        <SchemaStringField
          x-decorator="FormItem"
          title="Text Preview"
          x-component="Input"
          default="Hello world"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Text Preview Empty State"
          x-component="Input"
        />
      </SchemaVoidField>
      <SchemaVoidField
        x-component="PreviewText"
        :x-component-props="{
          textProps: { size: 'large', type: 'primary' },
          tagProps: {
            type: 'success',
            effect: 'dark',
          },
        }"
      >
        <SchemaStringField
          x-decorator="FormItem"
          title="Option Preview"
          x-component="Select"
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
          title="Option Preview Empty State"
          x-component="Select"
          :x-component-props="{
            multiple: true,
          }"
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
          x-component="DatePicker"
          default="2020-11-23 22:15:20"
        />
      </SchemaVoidField>
      <SchemaVoidField
        x-component="PreviewText"
        :x-component-props="{
          spaceProps: { direction: 'vertical' },
          tagProps: {
            type: 'primary',
            effect: 'dark',
          },
        }"
      >
        <SchemaStringField
          x-decorator="FormItem"
          title="Multi-year Preview"
          x-component="DatePicker"
          :x-component-props="{
            type: 'years',
            format: 'YYYY',
          }"
          :default="['2020', '2021']"
        />
      </SchemaVoidField>
    </SchemaField>
    <FormButtonGroup align-form-item>
      <ElButton
        @click="
          () => {
            form.setState((state) => {
              state.editable = !state.editable
            })
          }
        "
      >
        Toggle Read Mode
      </ElButton>
    </FormButtonGroup>
  </Form>
</template>



