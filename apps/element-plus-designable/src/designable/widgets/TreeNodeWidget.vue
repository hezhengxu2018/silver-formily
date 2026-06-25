<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { provide, toRef } from 'vue'
import { TreeNodeSymbol } from '../context'
import { useComponents, useDesigner } from '../hooks'
import RuntimeNode from './RuntimeNode.vue'

const props = defineProps<{
  node: TreeNode
}>()

useObserver()

const designerRef = useDesigner()
const componentsRef = useComponents()

provide(TreeNodeSymbol, toRef(props, 'node'))

function getRuntimeComponent() {
  return componentsRef.value[props.node.componentName] ?? RuntimeNode
}

function getComponentProps() {
  const node = props.node
  const designer = designerRef.value
  const dataId = designer?.props.nodeIdAttrName
    ? { [designer.props.nodeIdAttrName]: node.id }
    : {}

  return {
    ...node.designerProps?.defaultProps,
    ...node.props,
    ...node.designerProps?.getComponentProps?.(node),
    ...dataId,
    node,
  }
}

function getRenderChildren() {
  if (props.node.designerProps?.selfRenderChildren)
    return []
  return props.node.children.filter((child) => {
    const slot = child.props?.['x-slot']
    return !slot || slot === 'default'
  })
}
</script>

<template>
  <component
    :is="getRuntimeComponent()"
    v-if="!node.hidden"
    v-bind="getComponentProps()"
  >
    <TreeNodeWidget
      v-for="child in getRenderChildren()"
      :key="child.id"
      :node="child"
    />
  </component>
</template>
