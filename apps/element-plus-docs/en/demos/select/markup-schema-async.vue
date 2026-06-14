<script lang="ts" setup>
import type { DataField } from '@silver-formily/core'
import { createForm, onFieldReact } from '@silver-formily/core'
import { Form, FormItem, Select, Submit } from '@silver-formily/element-plus'
import { action } from '@silver-formily/reactive'
import { createSchemaField } from '@silver-formily/vue'

function useAsyncDataSource(pattern, service) {
  onFieldReact(pattern, (field: DataField) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      }),
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async (field) => {
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
    })
  },
})
const { SchemaField, SchemaNumberField, SchemaStringField } = createSchemaField(
  {
    components: {
      FormItem,
      Select,
    },
  },
)

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaNumberField
        name="linkage"
        title="Linked Select"
        x-decorator="FormItem"
        x-component="Select"
        :enum="[
          { label: 'Request 1', value: 1 },
          { label: 'Request 2', value: 2 },
        ]"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
      />
      <SchemaStringField
        name="select"
        title="Async Select"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="onSubmit">
      Submit
    </Submit>
  </Form>
</template>



