<script lang="ts" setup>
import { createForm } from '@formily/core'
import { ArrayCards, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    array: {
      'type': 'array',
      'x-component': 'ArrayCards',
      'maxItems': 3,
      'title': '对象数组',
      'items': {
        type: 'object',
        properties: {
          index: {
            'type': 'void',
            'x-component': 'ArrayCards.Index',
          },
          aa: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'AA',
            'required': true,
            'x-component': 'Input',
            'description': '输入123',
          },
          bb: {
            'type': 'string',
            'title': 'BB',
            'required': true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-reactions': [
              {
                dependencies: ['.aa'],
                when: '{{$deps[0] != \'123\'}}',
                fulfill: {
                  schema: {
                    'title': 'BB',
                    'x-disabled': true,
                  },
                },
                otherwise: {
                  schema: {
                    'title': 'Changed',
                    'x-disabled': false,
                  },
                },
              },
            ],
          },
          remove: {
            'type': 'void',
            'x-component': 'ArrayCards.Remove',
          },
          moveUp: {
            'type': 'void',
            'x-component': 'ArrayCards.MoveUp',
          },
          moveDown: {
            'type': 'void',
            'x-component': 'ArrayCards.MoveDown',
          },
        },
      },
      'properties': {
        addition: {
          'type': 'void',
          'title': '添加条目',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
  },
}

async function log(values) {
  console.log(values)
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

<style lang="scss" scoped></style>
