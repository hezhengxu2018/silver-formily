<script setup lang="ts">
import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { QueryFormItem, Tree } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton, ElMessage } from 'element-plus'

interface TreeNode {
  id: number
  label: string
  children?: TreeNode[]
}

const form = createForm()

const source: TreeNode[] = [
  {
    id: 1,
    label: 'East Region',
    children: [
      { id: 11, label: 'Shanghai' },
      { id: 12, label: 'Hangzhou' },
    ],
  },
  {
    id: 2,
    label: 'South Region',
    children: [
      { id: 21, label: 'Shenzhen' },
      { id: 22, label: 'Guangzhou' },
    ],
  },
]

function filterTree(nodes: TreeNode[], keyword: string): TreeNode[] {
  if (!keyword)
    return nodes

  return nodes
    .map((node) => {
      const children = node.children ? filterTree(node.children, keyword) : undefined
      if (node.label.includes(keyword) || (children && children.length > 0)) {
        return { ...node, children }
      }
      return null
    })
    .filter(Boolean) as TreeNode[]
}

const querySchema: ISchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': 'Keyword',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        placeholder: 'Filter node name',
      },
    },
  },
}

async function request(values: Record<string, any>) {
  await new Promise(resolve => setTimeout(resolve, 150))
  const keyword = `${values.keyword ?? ''}`.trim()
  const data = filterTree(source, keyword)

  return {
    data,
    success: true,
    total: data.length,
  }
}

async function handleSubmit() {
  try {
    const values = await form.submit()
    ElMessage.success(`Submit: ${JSON.stringify(values)}`)
  }
  catch {
    ElMessage.error('Please select at least one node before submit')
  }
}

const schema: ISchema = {
  type: 'object',
  properties: {
    selectedNodes: {
      'type': 'array',
      'x-validator': [
        {
          required: true,
          message: 'Please select at least one node',
        },
      ],
      'x-decorator': 'QueryFormItem',
      'x-decorator-props': {
        label: 'Target Nodes',
        required: true,
        tooltip: 'Select at least one node from the tree',
        extra: 'Light mode still supports FormItem label/required/feedback.',
        querySchema,
        request,
        mode: 'light',
        pagination: false,
        queryFormProps: {
          throttleWait: 200,
        },
      },
      'x-component': 'Tree',
      'x-component-props': {
        nodeKey: 'id',
        maxHeight: 260,
      },
    },
  },
}

const { SchemaField } = createSchemaField({
  components: {
    QueryFormItem,
    Tree,
  },
})
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <ElButton type="primary" style="margin-top: 12px;" @click="handleSubmit">
      Submit
    </ElButton>
  </FormProvider>
</template>
