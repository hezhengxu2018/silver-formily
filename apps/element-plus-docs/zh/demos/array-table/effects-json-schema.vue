<script lang="ts" setup>
import { createForm, isField, onFieldChange, onFieldReact } from '@formily/core'
import {
  ArrayTable,
  Editable,
  FormItem,
  Input,
  Space,
  Submit,
  Switch,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Editable,
    Switch,
    Space,
  },
})

const form = createForm({
  effects: () => {
    // 主动联动模式
    onFieldChange('hideFirstColumn', ['value'], (field) => {
      field.query('array.column3').take((target) => {
        if (isField(field)) {
          target.visible = !field.value
        }
      })
      field.query('array.*.a2').take((target) => {
        if (isField(field)) {
          target.visible = !field.value
        }
      })
    })
    // 被动联动模式
    onFieldReact('array.*.a2', (field) => {
      field.visible = !field.query('.a1').get('value')
    })
  },
})
const schema = {
  type: 'object',
  properties: {
    hideFirstColumn: {
      'type': 'boolean',
      'title': '隐藏A2',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    array: {
      'type': 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'items': {
        type: 'object',
        properties: {
          column1: {
            'type': 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 80,
              title: 'Index',
              align: 'center',
            },
            'properties': {
              index: {
                'type': 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column2: {
            'type': 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 100, title: '显隐->A2' },
            'properties': {
              a1: {
                'type': 'boolean',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          },
          column3: {
            'type': 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A2' },
            'properties': {
              a2: {
                'type': 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column4: {
            'type': 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: 'A3' },
            'properties': {
              a3: {
                'type': 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column5: {
            'type': 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              prop: 'operations',
              width: 200,
              fixed: 'right',
            },
            'properties': {
              item: {
                'type': 'void',
                'x-component': 'FormItem',
                'properties': {
                  space: {
                    'type': 'void',
                    'x-component': 'Space',
                    'x-component-props': {
                      style: 'height: 100%',
                    },
                    'properties': {
                      remove: {
                        'type': 'void',
                        'x-component': 'ArrayTable.Remove',
                      },
                      moveDown: {
                        'type': 'void',
                        'x-component': 'ArrayTable.MoveDown',
                      },
                      moveUp: {
                        'type': 'void',
                        'x-component': 'ArrayTable.MoveUp',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      'properties': {
        add: {
          'type': 'void',
          'x-component': 'ArrayTable.Addition',
          'title': '添加条目',
        },
      },
    },
  },
}

async function log(...v) {
  console.log(...v)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
