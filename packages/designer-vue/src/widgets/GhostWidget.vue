<script setup lang="ts">
import { CursorStatus } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useCursor, useDesigner } from '../hooks'
import { getNodeTitle } from './node-title'

useObserver()

const cursorRef = useCursor()
const designerRef = useDesigner()

function getDragNodes() {
  return designerRef.value?.findMovingNodes() ?? []
}

function isVisible() {
  const status = cursorRef.value?.status
  return !!getDragNodes().length && (
    status === CursorStatus.DragStart
    || status === CursorStatus.Dragging
  )
}

function getPreviewTitle() {
  const dragNodes = getDragNodes()
  const [firstNode] = dragNodes
  if (!firstNode)
    return ''
  if (dragNodes.length > 1)
    return `${getNodeTitle(firstNode)}...`
  return getNodeTitle(firstNode)
}

function getGhostStyle() {
  const position = cursorRef.value?.position
  const x = position?.topClientX ?? 0
  const y = position?.topClientY ?? 0

  return {
    transform: `perspective(1px) translate3d(${x - 18}px, ${y - 12}px, 0) scale(0.8)`,
  }
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-ghost-widget"
    :style="getGhostStyle()"
  >
    <span>{{ getPreviewTitle() }}</span>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-ghost-widget {
  @apply bg-blue-600 text-white;

  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
  display: flex;
  font-size: 12px;
  height: 30px;
  justify-content: center;
  left: 0;
  max-width: 180px;
  min-width: 56px;
  padding-left: 25px;
  padding-right: 15px;
  pointer-events: none;
  position: fixed;
  top: 0;
  user-select: none;
  z-index: 9999;

  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
