<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { ArrayCollapse, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    array: {
      'type': 'array',
      'x-component': 'ArrayCollapse',
      'maxItems': 3,
      'title': 'Object Array',
      'items': {
        'type': 'object',
        'x-component': 'ArrayCollapse.Item',
        'x-component-props': {
          header: 'Object Array',
        },
        'properties': {
          index: {
            'type': 'void',
            'x-component': 'ArrayCollapse.Index',
          },
          aa: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'AA',
            'required': true,
            'x-component': 'Input',
            'description': 'Enter 123',
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
            'x-component': 'ArrayCollapse.Remove',
          },
          moveUp: {
            'type': 'void',
            'x-component': 'ArrayCollapse.MoveUp',
          },
          moveDown: {
            'type': 'void',
            'x-component': 'ArrayCollapse.MoveDown',
          },
        },
      },
      'properties': {
        addition: {
          'type': 'void',
          'title': 'Add Item',
          'x-component': 'ArrayCollapse.Addition',
        },
      },
    },
  },
}

async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



