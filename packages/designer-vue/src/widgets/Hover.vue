<script setup lang="ts">
import { CursorStatus } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useCursor, useHover, useSelection, useViewport } from '../hooks'

useObserver()

const cursorRef = useCursor()
const hoverRef = useHover()
const selectionRef = useSelection()
const viewportRef = useViewport()

function getHoverNode() {
  return hoverRef.value?.node ?? null
}

function getRect() {
  const node = getHoverNode()
  if (!node)
    return null
  return viewportRef.value?.getValidNodeOffsetRect(node) ?? null
}

function getBoxStyle() {
  const rect = getRect()
  if (!rect)
    return {}
  return {
    height: `${rect.height}px`,
    left: `${rect.x}px`,
    top: `${rect.y}px`,
    width: `${rect.width}px`,
  }
}

function isVisible() {
  const node = getHoverNode()
  const rect = getRect()
  if (!node || node.hidden || node.isRoot)
    return false
  if (cursorRef.value?.status !== CursorStatus.Normal)
    return false
  if (selectionRef.value?.has(node))
    return false
  return !!rect?.width && !!rect?.height
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-hover"
    :style="getBoxStyle()"
  />
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-hover {
  @apply pointer-events-none absolute z-10 box-border border border-blue-400 bg-blue-500/5;
  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.18);
}
</style>
