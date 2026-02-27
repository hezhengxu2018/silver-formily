<script lang="ts" setup>
import { createForm } from '@formily/core'
import { action } from '@formily/reactive'
import { Cascader, Form, FormItem, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

type IAddress = { name: string, code: string, cities: number, districts: number } | string

function transformAddress(data = {}) {
  return Object.entries(data).reduce(
    (
      buf,
      [key, value]: [string, IAddress],
    ) => {
      if (typeof value === 'string')
        return buf.concat({ label: value, value: key })
      const { name, code, cities, districts } = value as any
      const _cities = transformAddress(cities)
      const _districts = transformAddress(districts)
      return buf.concat({
        label: name,
        value: code,
        children: _cities.length > 0
          ? _cities
          : (_districts.length > 0
              ? _districts
              : undefined),
      })
    },
    [],
  )
}

function useAsyncDataSource(url, transform) {
  return (field) => {
    if (globalThis.window === undefined)
      return
    field.loading = true

    fetch(url)
      .then(res => res.json())
      .then(
        action.bound((data) => {
          field.dataSource = transform(data)
          field.loading = false
        }),
      )
  }
}

const schema = {
  type: 'object',
  properties: {
    cascader: {
      'type': 'string',
      'title': '地址选择',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-component-props': {
        style: {
          width: '240px',
        },
      },
      'x-reactions': [
        '{{useAsyncDataSource("/location.json",transformAddress)}}',
      ],
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Cascader,
  },
})

async function onSubmit(value) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField :schema="schema" :scope="{ useAsyncDataSource, transformAddress }" />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
