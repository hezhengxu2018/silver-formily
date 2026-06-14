<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Form, FormItem, Select, Submit } from '@silver-formily/element-plus'
import { action } from '@silver-formily/reactive'
import { createSchemaField } from '@silver-formily/vue'

const schema = {
  type: 'object',
  properties: {
    linkage: {
      'type': 'string',
      'title': 'Linked Select',
      'enum': [
        {
          label: 'Request 1',
          value: 1,
        },
        {
          label: 'Request 2',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: 'width: 240px;',
      },
    },
    select: {
      'type': 'string',
      'title': 'Async Select',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: 'width: 240px;',
      },
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
    },
  },
}

function useAsyncDataSource(service) {
  return (field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      }),
    )
  }
}

async function loadData(field) {
  const linkage = field.query('linkage').get('value')
  if (!linkage)
    return []
  return new Promise((resolve) => {
    setTimeout(() => {
      if (linkage === 1) {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
          },
          {
            label: 'BBB',
            value: 'ccc',
          },
        ])
      }
      else if (linkage === 2) {
        resolve([
          {
            label: 'CCC',
            value: 'ccc',
          },
          {
            label: 'DDD',
            value: 'ddd',
          },
        ])
      }
    }, 1500)
  })
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Select,
  },
})

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField :schema="schema" :scope="{ useAsyncDataSource, loadData }" />
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



