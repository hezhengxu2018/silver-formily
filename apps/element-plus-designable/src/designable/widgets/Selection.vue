<script setup lang="ts">
import { CursorStatus } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useCursor, useMoveHelper, useSelection, useTree } from '../hooks'
import SelectionBox from './SelectionBox.vue'

useObserver()

const cursorRef = useCursor()
const moveHelperRef = useMoveHelper()
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

function shouldRenderSelection() {
  if (cursorRef.value?.status !== CursorStatus.Normal && moveHelperRef.value?.touchNode)
    return false
  return true
}
</script>

<template>
  <template v-if="shouldRenderSelection()">
    <SelectionBox
      v-for="node in getSelectedNodes()"
      :key="node.id"
      :node="node"
      :show-helpers="getSelectedNodes().length === 1"
    />
  </template>
</template>
