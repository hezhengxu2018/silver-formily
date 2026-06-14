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
    string_array: {
      'type': 'array',
      'x-component': 'ArrayCollapse',
      'maxItems': 3,
      'x-decorator': 'FormItem',
      'items': {
        'type': 'object',
        'x-component': 'ArrayCollapse.Item',
        'x-component-props': {
          title: 'String Array',
        },
        'properties': {
          index: {
            'type': 'void',
            'x-component': 'ArrayCollapse.Index',
          },
          input: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'Input',
            'required': true,
            'x-component': 'Input',
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
    array: {
      'type': 'array',
      'x-component': 'ArrayCollapse',
      'maxItems': 3,
      'x-decorator': 'FormItem',
      'items': {
        'type': 'object',
        'x-component': 'ArrayCollapse.Item',
        'x-component-props': {
          title: 'Object Array',
        },
        'properties': {
          index: {
            'type': 'void',
            'x-component': 'ArrayCollapse.Index',
          },
          input: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'Input',
            'required': true,
            'x-component': 'Input',
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
    array_unshift: {
      'type': 'array',
      'x-component': 'ArrayCollapse',
      'maxItems': 3,
      'x-decorator': 'FormItem',
      'items': {
        'type': 'object',
        'x-component': 'ArrayCollapse.Item',
        'x-component-props': {
          title: 'Object Array',
        },
        'properties': {
          index: {
            'type': 'void',
            'x-component': 'ArrayCollapse.Index',
          },
          input: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'title': 'Input',
            'required': true,
            'x-component': 'Input',
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
          'title': 'Add Item (unshift)',
          'x-component': 'ArrayCollapse.Addition',
          'x-component-props': {
            method: 'unshift',
          },
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



