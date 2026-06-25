<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { useSelection, useTree } from '../hooks'
import SelectionBox from './SelectionBox.vue'

useObserver()

const selectionRef = useSelection()
const treeRef = useTree()

function getSelectedNodes() {
  const tree = treeRef.value
  const selected = selectionRef.value?.selected ?? []
  if (!tree)
    return []
  return selected
    .map(id => tree.findById(id))
    .filter(node => node && !node.hidden && !node.isRoot)
}
</script>

<template>
  <SelectionBox
    v-for="node in getSelectedNodes()"
    :key="node.id"
    :node="node"
    :show-helpers="getSelectedNodes().length === 1"
  />
</template>
