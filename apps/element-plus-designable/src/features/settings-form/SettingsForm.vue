<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { SelectNodeEvent } from '@silver-formily/designer-core'
import { reactiveComputed, useOperation } from '@silver-formily/designer-vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { computed, onBeforeUnmount, shallowRef, useAttrs, watch } from 'vue'
import { createNamespace } from '@/lib/utils'
import FieldSchemaPanel from './components/FieldSchemaPanel.vue'
import FormSchemaPanel from './components/FormSchemaPanel.vue'
import './styles.css'

defineOptions({
  name: 'SettingsForm',
  inheritAttrs: false,
})

const props = defineProps<{
  collapsed?: boolean
}>()

useObserver()

const attrs = useAttrs()
const { b } = createNamespace('settings-form')
const operationRef = useOperation()
let unsubscribeSelectNode: (() => void) | undefined
let lastSelectedNodeId: string | undefined
let manuallyClosedNodeId: string | undefined
const formSourceRef = shallowRef<{
  isEmpty: boolean
  key?: string
  node?: TreeNode
  schema?: any
}>({ isEmpty: true })
const itemSourceRef = shallowRef<{
  key?: string
  node?: TreeNode
  schema?: any
  visible: boolean
}>({ visible: false })

const currentNodeRef = reactiveComputed(() => {
  const selection = operationRef.value?.selection
  if (!selection || selection.length !== 1)
    return null
  return selection.selectedNodes[0] ?? null
})

const formNodeRef = reactiveComputed(() => operationRef.value?.tree ?? null)

const itemNodePathRef = computed(() => {
  const node = itemSourceRef.value.node
  return node ? getNodePath(node) : []
})

watch(
  formNodeRef,
  () => {
    const node = formNodeRef.value
    const schema = node?.designerProps?.propsSchema

    formSourceRef.value = {
      isEmpty: !(node && schema),
      key: node?.id,
      node: node ?? undefined,
      schema,
    }
  },
  { immediate: true },
)

watch(
  operationRef,
  () => {
    unsubscribeSelectNode?.()
    unsubscribeSelectNode = undefined

    const engine = operationRef.value?.workspace?.engine
    if (!engine)
      return

    unsubscribeSelectNode = engine.subscribeTo(SelectNodeEvent, (event) => {
      const source = event.data.source
      const node = Array.isArray(source) ? source[0] : source
      manuallyClosedNodeId = undefined
      syncItemPanelFromNode(node ?? currentNodeRef.value, true)
    })
  },
  { immediate: true },
)

watch(
  [currentNodeRef, () => props.collapsed],
  () => {
    const node = currentNodeRef.value

    if (props.collapsed) {
      itemSourceRef.value = {
        ...itemSourceRef.value,
        key: node?.id,
        node: node ?? undefined,
        schema: node?.designerProps?.propsSchema,
        visible: false,
      }
      return
    }

    if (node?.id === lastSelectedNodeId && itemSourceRef.value.visible)
      return

    syncItemPanelFromNode(node)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  unsubscribeSelectNode?.()
})

function syncItemPanelFromNode(node?: TreeNode | null, forceOpen = false) {
  lastSelectedNodeId = node?.id

  const schema = node?.designerProps?.propsSchema
  const shouldShowItem = !!(
    node
    && schema
    && isFieldConfigNode(node)
    && !props.collapsed
    && (forceOpen || manuallyClosedNodeId !== node.id)
  )

  itemSourceRef.value = {
    key: node?.id,
    node: node ?? undefined,
    schema,
    visible: shouldShowItem,
  }
}

function closeItemPanel() {
  manuallyClosedNodeId = itemSourceRef.value.node?.id
  itemSourceRef.value = {
    ...itemSourceRef.value,
    visible: false,
  }
}

function isFieldConfigNode(node: TreeNode) {
  return !node.isRoot
    && node.componentName !== 'Form'
    && node.props?.['x-component'] !== 'Form'
}

function getNodePath(node: TreeNode) {
  return node
    .getParents()
    .reverse()
    .concat(node)
    .filter(item => item && !item.isRoot)
}
</script>

<template>
  <div
    :class="b()"
    v-bind="attrs"
  >
    <div :class="b('content')">
      <FormSchemaPanel
        :is-empty="formSourceRef.isEmpty"
        :node="formSourceRef.node"
        :schema="formSourceRef.schema"
        :source-key="formSourceRef.key"
      />

      <FieldSchemaPanel
        :node="itemSourceRef.node"
        :path="itemNodePathRef"
        :schema="itemSourceRef.schema"
        :source-key="itemSourceRef.key"
        :visible="itemSourceRef.visible"
        @close="closeItemPanel"
      />
    </div>
  </div>
</template>
