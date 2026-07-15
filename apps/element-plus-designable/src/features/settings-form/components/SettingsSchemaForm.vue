<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import type { Schema } from '@silver-formily/json-schema'
import type { IAccordion } from '../formily-shadcn'
import { createForm } from '@silver-formily/core'
import {
  FormItem,
  Input,
  InputNumber,
  Select,
  Switch,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { computed, defineComponent, h, shallowRef, watch } from 'vue'
import { Accordion } from '../formily-shadcn'

const props = defineProps<{
  accordion?: IAccordion
  node?: TreeNode
  schema?: Schema | Record<string, any>
  sourceKey?: string
}>()

const SettingsAccordion = defineComponent({
  name: 'SettingsSchemaAccordion',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(Accordion, {
      ...attrs,
      accordion: (attrs as { accordion?: IAccordion }).accordion ?? props.accordion,
    }, slots)
  },
})

const { SchemaField } = createSchemaField({
  components: {
    'Accordion': SettingsAccordion,
    'Accordion.Item': Accordion.Item,
    FormItem,
    Input,
    'Input.TextArea': Input.TextArea,
    InputNumber,
    Select,
    Switch,
  },
})

const formRef = shallowRef(createSettingsForm())
const formKeyRef = computed(() => props.sourceKey ?? props.node?.id ?? 'empty')

watch(
  formKeyRef,
  () => {
    formRef.value = createSettingsForm()
  },
  { immediate: true },
)

function createSettingsForm() {
  const node = props.node

  return createForm({
    initialValues: createInitialValues(),
    values: node?.props,
  })
}

function createInitialValues() {
  const node = props.node
  const initialValues = {
    ...node?.designerProps?.defaultProps,
  }

  if (node?.id && hasNameField(props.schema))
    initialValues.name = node.props?.name ?? node.id

  return initialValues
}

function hasNameField(schema?: Schema | Record<string, any>) {
  const root = normalizeSchema(schema)
  let found = false

  function visit(current?: Record<string, any>) {
    if (!current || found)
      return

    Object.entries(current.properties ?? {}).forEach(([key, child]) => {
      if (key === 'name') {
        found = true
        return
      }
      visit(child as Record<string, any>)
    })
  }

  visit(root)
  return found
}

function normalizeSchema(schema?: Schema | Record<string, any>) {
  return schema && typeof (schema as Schema).toJSON === 'function'
    ? (schema as Schema).toJSON()
    : schema
}

function validateNodeName(value?: string) {
  const node = props.node
  const name = String(value ?? '').trim()

  if (!name || !node?.parent)
    return ''

  const duplicated = node.parent.children.some((child) => {
    if (child === node)
      return false
    return String(child.props?.name ?? child.id) === name
  })

  return duplicated ? '同级节点标识不能重复' : ''
}
</script>

<template>
  <FormProvider
    :key="formKeyRef"
    :form="formRef"
  >
    <SchemaField
      v-if="schema"
      :key="formKeyRef"
      :schema="schema"
      :scope="{ $validateNodeName: validateNodeName }"
    />
  </FormProvider>
</template>
