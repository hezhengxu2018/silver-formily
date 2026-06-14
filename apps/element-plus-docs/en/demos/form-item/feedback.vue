<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import {
  Cascader,
  DatePicker,
  FormItem,
  FormLayout,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { h } from 'vue'

function SuccessIcon() {
  return h('i', {
    class: 'el-icon-circle-check',
    style: { color: '#8AE65C' },
  })
}

function Title(props, { slots }) {
  return h('p', props, slots.default?.())
}

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    Title,
    FormItem,
    InputNumber,
    Input,
    Cascader,
    Select,
    DatePicker,
    FormLayout,
    TimePicker,
  },
})
const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="Title" x-content="Form State: " />
      <SchemaStringField
        title="Error State (feedbackStatus=error)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'error',
        }"
      />
      <SchemaStringField
        title="Warning State (feedbackStatus=warning)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'warning',
        }"
      />
      <SchemaStringField
        title="Success State (feedbackStatus=success)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'success',
        }"
      />
      <SchemaStringField
        title="Loading State (feedbackStatus=pending)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'pending',
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Feedback Layout: " />
      <SchemaStringField
        title="Compact Mode Required"
        x-decorator="FormItem"
        x-component="Input"
        :required="true"
        :x-decorator-props="{
          feedbackLayout: 'terse',
        }"
      />
      <SchemaStringField
        title="Compact Mode with Feedback (feedbackLayout=terse)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'error',
          feedbackText: 'error message',
          feedbackLayout: 'terse',
        }"
      />
      <SchemaStringField
        title="Compact Mode without Feedback (feedbackLayout=terse)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackLayout: 'terse',
        }"
      />
      <SchemaStringField
        title="Loose Mode (feedbackLayout=loose)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'error',
          feedbackText: 'error message',
          feedbackLayout: 'loose',
        }"
      />
      <SchemaStringField
        title="Popover Mode (feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'warning',
          feedbackText: 'warning message',
          feedbackLayout: 'popover',
        }"
      />
      <SchemaStringField
        title="Popover Mode (feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'error',
          feedbackText: 'error message',
          feedbackLayout: 'popover',
        }"
      />
      <SchemaStringField
        title="Popover Mode (feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'success',
          feedbackText: 'success message',
          feedbackLayout: 'popover',
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Component Support: " />
      <SchemaVoidField
        x-component="FormLayout"
        :x-component-props="{
          labelCol: 6,
          wrapperCol: 10,
        }"
      >
        <SchemaStringField
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="DateRangePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
          :x-component-props="{
            type: 'daterange',
          }"
        />
        <SchemaStringField
          title="YearPicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
          :x-component-props="{
            type: 'year',
          }"
        />
        <SchemaStringField
          title="MonthPicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
          :x-component-props="{
            type: 'month',
          }"
        />
        <SchemaStringField
          title="TimePicker"
          x-decorator="FormItem"
          x-component="TimePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="InputNumber"
          x-decorator="FormItem"
          x-component="InputNumber"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>
</template>



