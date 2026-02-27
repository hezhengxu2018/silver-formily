<script lang="ts" setup>
import type { DataField } from '@formily/core'
import { createForm, onFieldReact } from '@formily/core'
import { action } from '@formily/reactive'
import { Form, FormItem, Select, Submit } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'

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

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="linkage"
      title="联动选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
        },
      ]"
      :data-source="[
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
      ]"
    />
    <Field
      name="select"
      title="异步选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
