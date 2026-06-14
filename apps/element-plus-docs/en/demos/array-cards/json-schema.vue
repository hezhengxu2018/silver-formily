<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
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
    string_array: {
      'type': 'array',
      'x-component': 'ArrayCards',
      'maxItems': 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: 'String Array',
      },
      'items': {
        type: 'void',
        properties: {
          index: {
            'type': 'void',
            'x-component': 'ArrayCards.Index',
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
          'title': 'Add Item',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
    array: {
      'type': 'array',
      'x-component': 'ArrayCards',
      'maxItems': 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: 'Object Array',
      },
      'items': {
        type: 'object',
        properties: {
          index: {
            'type': 'void',
            'x-component': 'ArrayCards.Index',
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
          'title': 'Add Item',
          'x-component': 'ArrayCards.Addition',
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



