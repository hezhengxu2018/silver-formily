<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { ClosestPosition } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useMoveHelper, useViewport } from '../hooks'

useObserver()

const moveHelperRef = useMoveHelper()
const viewportRef = useViewport()

function getNodeRect(node: TreeNode) {
  return viewportRef.value?.getValidNodeOffsetRect(node) ?? null
}

function getCoverStyle(node: TreeNode) {
  const rect = getNodeRect(node)
  if (!rect)
    return {}
  return {
    height: `${rect.height}px`,
    left: `${rect.x}px`,
    top: `${rect.y}px`,
    width: `${rect.width}px`,
  }
}

function getDraggingNodes() {
  return moveHelperRef.value?.dragNodes?.filter(node => !node.isSourceNode) ?? []
}

function getDroppingNode() {
  const moveHelper = moveHelperRef.value
  if (
    !moveHelper?.closestNode
    || moveHelper.closestDirection !== ClosestPosition.Inner
    || moveHelper.dragNodes.includes(moveHelper.closestNode)
  ) {
    return null
  }
  return moveHelper.closestNode
}

function isDroppingVisible() {
  const node = getDroppingNode()
  return !!node && !!getNodeRect(node)
}

function getDroppingCoverStyle() {
  const node = getDroppingNode()
  return node ? getCoverStyle(node) : {}
}
</script>

<template>
  <template
    v-for="node in getDraggingNodes()"
    :key="node.id"
  >
    <div
      v-if="getNodeRect(node)"
      class="dn-aux-cover-rect dn-aux-cover-rect--dragging"
      :style="getCoverStyle(node)"
    />
  </template>

  <div
    v-if="isDroppingVisible()"
    class="dn-aux-cover-rect dn-aux-cover-rect--dropping"
    :style="getDroppingCoverStyle()"
  />
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-cover-rect {
  border-radius: 4px;
  box-sizing: border-box;
  pointer-events: none;
  position: absolute;
  z-index: 12;

  &--dragging {
    @apply bg-blue-500/20;
  }

  &--dropping {
    @apply bg-blue-500/10 border-blue-500;
    border-width: 1px;
  }
}
</style>
