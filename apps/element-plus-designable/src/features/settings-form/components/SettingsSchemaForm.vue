<script setup lang="ts">
import type { GeneralField } from '@silver-formily/core'
import type { TreeNode } from '@silver-formily/designer-core'
import type { Schema } from '@silver-formily/json-schema'
import type { IAccordion } from '../formily-shadcn'
import { createForm, onFieldInputValueChange } from '@silver-formily/core'
import { FormItem as ElementPlusFormItem, Form } from '@silver-formily/element-plus'
import { connect, createSchemaField, mapProps } from '@silver-formily/vue'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import {
  Accordion,
  Input,
  InputNumber,
  Select,
  Switch,
} from '../formily-shadcn'
import { getFieldControlId } from '../formily-shadcn/utils'

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

const SettingsFormItem = connect(
  ElementPlusFormItem,
  mapProps((props: Record<string, any>, field: GeneralField) => ({
    ...props,
    for: props.for ?? getFieldControlId(field),
  })),
)

const { SchemaField } = createSchemaField({
  components: {
    'Accordion': SettingsAccordion,
    'Accordion.Item': Accordion.Item,
    'FormItem': SettingsFormItem,
    Input,
    'Input.TextArea': Input.TextArea,
    InputNumber,
    Select,
    Switch,
  },
})

const formRef = shallowRef(createSettingsForm())
const formKeyRef = computed(() => props.sourceKey ?? props.node?.id ?? 'empty')
let keyboardInputPending = false
let snapshotTimer: ReturnType<typeof setTimeout> | undefined

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
    effects() {
      onFieldInputValueChange('*', () => {
        if (!keyboardInputPending)
          return

        clearTimeout(snapshotTimer)
        snapshotTimer = setTimeout(() => {
          node?.takeSnapshot('update:node:props')
          keyboardInputPending = false
        }, 1000)
      })
    },
  })
}

function markKeyboardInput() {
  keyboardInputPending = true
}

onMounted(() => {
  window.addEventListener('keyup', markKeyboardInput)
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', markKeyboardInput)
  clearTimeout(snapshotTimer)
})

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
  <Form
    :key="formKeyRef"
    :form="formRef"
    :label-col="6"
    :wrapper-col="16"
  >
    <SchemaField
      v-if="schema"
      :key="formKeyRef"
      :schema="schema"
      :scope="{ $validateNodeName: validateNodeName }"
    />
  </Form>
</template>
