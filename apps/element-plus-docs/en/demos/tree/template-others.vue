<script lang="ts" setup>
import { createForm, isField } from '@silver-formily/core'
import { FormItem, FormLayout, Input, Tree } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { omit } from 'lodash-es'

const form = createForm()
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="4" :wrapper-col="16">
      <Field
        name="tree"
        title="Global Disabled"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'all',
          includeHalfChecked: true,
        }]"
        :data-source="data"
        :initial-value="[9]"
        :disabled="true"
      />
      <Field
        name="tree2"
        title="Loading"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          checkStrictly: true,
          optionFormatter: (node) => omit(node, 'children'),
        }]"
        :data-source="data"
        :reactions="(field) => {
          if (!isField(field)) return
          field.loading = true
        }"
      />
      <Field
        name="filter"
        title="Filter Nodes"
        :decorator="[FormItem]"
        :component="[Input, {
          placeholder: 'Enter a node name',
        }]"
        :reactions="(field) => {
          if (!isField(field)) return
          const tree3 = field.query('tree3').take()
          const inputValue = field.value
          if (!tree3)
            return
          const tree3Instance = tree3.invoke('getTreeRef')
          if (!tree3Instance)
            return
          tree3Instance.value.filter(inputValue)
        }"
      />
      <Field
        name="tree3"
        title="Call Instance Methods"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          checkStrictly: true,
          defaultExpandAll: true,
          filterNodeMethod: (value: string, data) => {
            if (!value) return true
            return data.label.includes(value)
          },
        }]"
        :data-source="data"
      />
    </FormLayout>
  </FormProvider>
</template>



