<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  Cascader,
  DatePicker,
  Form,
  FormButtonGroup,
  FormItem,
  Input,
  PreviewText,
  Segmented,
  Select,
  Slider,
  TimePicker,
  Tree,
} from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField, SchemaVoidField, SchemaStringField, SchemaNumberField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    Input,
    Segmented,
    Select,
    Slider,
    DatePicker,
    Cascader,
    TimePicker,
    PreviewText,
    Tree,
  },
})

const form = createForm({ readPretty: true })

const segmentedOptions = [
  { value: 'day', label: '按天' },
  { value: 'week', label: '按周' },
  { value: 'month', label: '按月' },
]

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
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
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
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
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
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
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
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
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
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
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
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const warpText = `aaaaa   bbbbbb 
  adasdb
  alh`
</script>

<template>
  <Form
    :label-col="6"
    :wrapper-col="10"
    :form="form"
  >
    <SchemaField>
      <SchemaStringField
        x-decorator="FormItem"
        title="文本预览"
        x-component="Input"
        default="Hello world"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="文本预览空值"
        x-component="Input"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="文本预览Formatter"
        x-component="Input"
        default="1234567890"
        :x-component-props="{
          formatter: (value) => `$ ${value ?? 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
        }"
      />
      <SchemaVoidField
        x-component="PreviewText"
        :x-component-props="{
          textProps: { style: { whiteSpace: 'pre-wrap' } },
        }"
      >
        <SchemaStringField
          x-decorator="FormItem"
          title="文本域多行换行预览"
          x-component="Input.TextArea"
          :default="warpText"
        />
      </SchemaVoidField>
      <SchemaStringField
        x-decorator="FormItem"
        title="选择项预览"
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
        title="选择项预览空值"
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
        title="分段选择预览"
        x-component="Segmented"
        :default="segmentedOptions[0].value"
        :enum="segmentedOptions"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="字符串选项预览"
        x-component="Segmented"
        default="周"
        :enum="['日', '周', '月']"
      />
      <SchemaNumberField
        x-decorator="FormItem"
        title="滑块预览"
        x-component="Slider"
        :x-component-props="{
          style: {
            width: '240px',
          },
          showInput: true,
        }"
        :default="30"
      />
      <SchemaArrayField
        x-decorator="FormItem"
        title="滑块范围预览格式化"
        x-component="Slider"
        :x-component-props="{
          style: {
            width: '240px',
          },
          range: true,
          marks: {
            0: '0',
            20: '20',
            40: '40',
            60: '60',
            80: '80',
            100: '100',
          },
          formatter: (value) => `${value?.[0]}% ~ ${value?.[1]}%`,
        }"
        :default="[20, 60]"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="日期预览"
        x-component="DatePicker"
        default="2020-11-23 22:15:20"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="年份多选预览"
        x-component="DatePicker"
        :x-component-props="{
          type: 'years',
          format: 'YYYY年',
        }"
        :default="['2020', '2021']"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="日期多选预览"
        x-component="DatePicker"
        :x-component-props="{
          type: 'dates',
        }"
        :default="['2020-11-23', '2020-11-24']"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="日期范围预览"
        x-component="DatePicker"
        :x-component-props="{
          type: 'daterange',
          format: 'YYYY/MM/DD',
        }"
        :default="['2020-11-23', '2020-11-24 22:15:20']"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="日期时间范围预览"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetimerange',
          format: 'YYYY年MM月DD日 HH:mm:ss',
          rangeSeparator: '至',
        }"
        :default="['2020-11-23 22:15:20', '2020-11-24 22:15:20']"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="Cascader预览"
        x-component="Cascader"
        :default="['guide', 'disciplines', 'consistency']"
        :enum="options"
      />
      <SchemaArrayField
        x-decorator="FormItem"
        title="Cascader多选预览"
        x-component="Cascader"
        :x-component-props="{
          props: {
            multiple: true,
          },
        }"
        :default="[['guide', 'disciplines', 'consistency'], ['guide', 'disciplines', 'feedback']]"
        :enum="options"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="Cascader预览不显示路径"
        x-component="Cascader"
        :x-component-props="{
          showAllLevels: false,
        }"
        :default="['guide', 'disciplines', 'consistency']"
        :enum="options"
      />
      <SchemaArrayField
        x-decorator="FormItem"
        title="Cascader多选不显示路径"
        x-component="Cascader"
        :x-component-props="{
          props: {
            multiple: true,
          },
          showAllLevels: false,
        }"
        :default="[['guide', 'disciplines', 'consistency'], ['guide', 'disciplines', 'feedback']]"
        :enum="options"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="Tree预览"
        x-component="Tree"
        :x-component-props="{
          nodeKey: 'value',
          valueType: 'all',
          maxHeight: 100,
        }"
        :default="['axure']"
        :enum="options"
      />
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
        切换阅读态
      </ElButton>
    </FormButtonGroup>
  </Form>
</template>
