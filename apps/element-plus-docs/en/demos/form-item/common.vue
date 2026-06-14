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

function Title(props, { slots }) {
  return h('p', props, slots.default?.())
}
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
    ],
  },

]

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
      <SchemaVoidField x-component="Title" x-content="Display When Label Is Empty: " />
      <SchemaStringField
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
        }"
      />
      <SchemaStringField
        title=""
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Colon: " />
      <SchemaStringField
        title="Default"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        title="No Colon (colon=false)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          colon: false,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Fixed Width Settings: " />
      <SchemaStringField
        title="Fixed Label Width (labelWidth)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
        }"
      />
      <SchemaStringField
        title="Fixed Label Width (labelWidth) Overflow"
        description="Description text"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          tooltip: 'Helpful tip',
        }"
      />
      <SchemaStringField
        title="Fixed Label Width (labelWidth) Wrapped Text"
        description="Description text"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          labelWrap: true,
          tooltip: 'Helpful tip',
        }"
      />
      <SchemaStringField
        title="Fixed Content Width (wrapperWidth)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          wrapperWidth: 300,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Alignment Settings:" />
      <SchemaStringField
        title="Left-aligned Label (labelAlign=left)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          labelAlign: 'left',
        }"
      />
      <SchemaStringField
        title="Right-aligned Label (labelAlign=right, default)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          labelAlign: 'right',
        }"
      />
      <SchemaStringField
        title="Left-aligned Content (wrapperAlign=left, default)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          wrapperWidth: 240,
          wrapperAlign: 'left',
        }"
      />
      <SchemaStringField
        title="Right-aligned Content (wrapperAlign=right)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          wrapperWidth: 240,
          wrapperAlign: 'right',
        }"
      />
      <SchemaStringField
        title="tooltip"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          tooltip: 'tooltip',
        }"
      />
      <SchemaStringField
        title="tooltip"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          tooltip: 'tooltip',
          tooltipLayout: 'text',
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Fullness: " />
      <SchemaStringField
        title="Not Full Width by Default (fullness=false)"
        x-decorator="FormItem"
        x-component="Cascader"
        :enum="options"
        :x-decorator-props="{
          fullness: false,
        }"
      />
      <SchemaStringField
        title="Full Width (fullness=true)"
        x-decorator="FormItem"
        x-component="Cascader"
        :enum="options"
        :x-decorator-props="{
          fullness: true,
        }"
      />
      <SchemaStringField
        title="InputNumber Full Width (fullness=true)"
        x-decorator="FormItem"
        x-component="InputNumber"
        :x-decorator-props="{
          fullness: true,
        }"
      />
      <SchemaStringField
        title="InputNumber Not Full Width (fullness=false)"
        x-decorator="FormItem"
        :x-decorator-props="{
          addonBefore: 'addonBefore',
          addonAfter: 'addonAfter',
        }"
        x-component="InputNumber"
      />
      <SchemaVoidField x-component="Title" x-content="Auxiliary Info: " />
      <SchemaStringField
        title="Required Asterisk"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          asterisk: true,
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="Prefix"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          addonBefore: 'addonBefore',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="Suffix"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          addonAfter: 'addonAfter',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="Help Text feedbackText"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackText: 'feedbackText',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="Extra Info extra"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackText: 'feedbackText',
          extra: 'extra',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="Form State: " />
      <SchemaVoidField x-component="FormLayout">
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
      </SchemaVoidField>
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
    </SchemaField>
  </FormProvider>
</template>



