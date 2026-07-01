<script setup lang="ts">
import type { Component } from 'vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { provide, toRef } from 'vue'
import { DesignerComponentsSymbol } from '../context'
import { useDesigner, useTree } from '../hooks'
import TreeNodeWidget from './TreeNodeWidget'

const props = withDefaults(defineProps<{
  components?: Record<string, Component>
}>(), {
  components: () => ({}),
})

useObserver()

const designerRef = useDesigner()
const treeRef = useTree()

provide(DesignerComponentsSymbol, toRef(props, 'components'))

function getRootNodeAttrs() {
  const tree = treeRef.value
  const designer = designerRef.value
  const nodeIdAttrName = designer?.props.nodeIdAttrName
  if (!tree || !nodeIdAttrName)
    return {}
  return {
    [nodeIdAttrName]: tree.id,
  }
}
</script>

<template>
  <div
    class="dn-component-tree"
    v-bind="getRootNodeAttrs()"
  >
    <TreeNodeWidget
      v-if="treeRef"
      :node="treeRef"
    />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-component-tree {
  @apply mx-auto my-8 block min-h-[42rem] min-w-full w-[min(100%,50rem)] rounded-[1.25rem] bg-white/90 p-8 pb-24 shadow-[0_24px_60px_rgba(15,23,42,0.08)];
  box-sizing: border-box;

  > * {
    @apply min-h-full min-w-full;
  }
}
</style>
