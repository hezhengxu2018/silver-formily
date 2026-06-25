<script setup lang="ts">
import type { Component } from 'vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { onBeforeUnmount, provide, ref, toRef, watch } from 'vue'
import { DesignerComponentsSymbol } from '../context'
import { useDesigner, useTree } from '../hooks'
import TreeNodeWidget from './TreeNodeWidget.vue'

const props = withDefaults(defineProps<{
  components?: Record<string, Component>
}>(), {
  components: () => ({}),
})

useObserver()

const designerRef = useDesigner()
const treeRef = useTree()
const renderTick = ref(0)

provide(DesignerComponentsSymbol, toRef(props, 'components'))

const refreshEvents = new Set([
  'append:node',
  'insert:after',
  'insert:before',
  'insert:children',
  'prepend:node',
  'remove:node',
  'update:children',
  'update:node:props',
  'wrap:node',
])

let disposeEngineEvents: (() => void) | undefined

watch(
  designerRef,
  (designer) => {
    disposeEngineEvents?.()
    disposeEngineEvents = undefined

    if (!designer)
      return

    disposeEngineEvents = designer.subscribe((event) => {
      if (refreshEvents.has(event.type))
        renderTick.value += 1
    })
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  disposeEngineEvents?.()
})
</script>

<template>
  <div class="dn-component-tree">
    <TreeNodeWidget
      v-if="treeRef"
      :key="`${treeRef.id}-${renderTick}`"
      :node="treeRef"
    />
  </div>
</template>

<style scoped>
@reference "../../styles/globals.css";

.dn-component-tree {
  @apply min-h-full;
}
</style>
