<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  DatePicker,
  Editable,
  FormButtonGroup,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    DatePicker,
    Editable,
  },
})

const schema = {
  type: 'object',
  properties: {
    date: {
      'type': 'string',
      'title': '日期',
      'x-decorator': 'Editable',
      'x-decorator-props': {
        editProps: {
          size: 'small',
          class: 'editable-date-picker__width',
        },
      },
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
      },
    },
    input: {
      'type': 'string',
      'title': '输入框',
      'x-decorator': 'Editable',
      'x-decorator-props': {
        editProps: {
          size: 'small',
          style: {
            width: '80px',
          },
        },
      },
      'x-component': 'Input',
    },
    void: {
      'type': 'void',
      'title': '虚拟节点容器',
      'x-component': 'Editable.Popover',
      'x-reactions':
        '{{(field) => field.title = field.query(\'.void.date2\').get(\'value\') || field.title}}',
      'properties': {
        date2: {
          'type': 'string',
          'title': '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        input2: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    iobject: {
      'type': 'object',
      'title': '对象节点容器',
      'x-component': 'Editable.Popover',
      'x-reactions':
        '{{(field) => field.title = field.value && field.value.date || field.title}}',
      'properties': {
        date: {
          'type': 'string',
          'title': '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}

const form = createForm()

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <FormButtonGroup>
      <Submit @submit="log">
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<style lang="scss">
.editable-date-picker__width .el-tooltip__trigger {
  --el-date-editor-daterange-width: 200px;
}
</style>
