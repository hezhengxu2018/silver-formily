<script lang="ts" setup>
import type { DataField } from '@formily/core'
import { createForm, onFieldInit, onFieldReact } from '@formily/core'
import { action, observable } from '@formily/reactive'
import { FormItem, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

let timeout

function fetchData(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }

  function fake() {
    callback([
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

  timeout = setTimeout(fake, 300)
}

function useAsyncDataSource(pattern, service) {
  const keyword = observable.ref('')

  onFieldInit(pattern, (field) => {
    field.setComponentProps({
      remoteMethod: (value) => {
        keyword.value = value
      },
    })
  })

  onFieldReact(pattern, (field: DataField) => {
    field.loading = true
    service({ field, keyword: keyword.value }).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      }),
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async ({ keyword }) => {
      if (!keyword) {
        return []
      }
      return new Promise((resolve) => {
        fetchData(keyword, resolve)
      })
    })
  },
})
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Select,
  },
})

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="异步搜索选择框"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          filterable: true,
          remote: true,
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
