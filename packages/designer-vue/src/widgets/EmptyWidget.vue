<script setup lang="ts">
import { CursorStatus } from '@silver-formily/designer-core'
import { useCursor, useTree, useViewport } from '../hooks'
import { reactiveComputed } from '../shared/reactive'

defineSlots<{
  default?: (props: { isDragOver: boolean }) => unknown
}>()

const treeRef = useTree()
const cursorRef = useCursor()
const viewportRef = useViewport()
const isEmpty = reactiveComputed(() => !treeRef.value?.children.length)
const isDragOver = reactiveComputed(() => {
  const cursor = cursorRef.value
  const viewport = viewportRef.value
  if (!cursor || !viewport)
    return false
  if (cursor.status !== CursorStatus.Dragging && cursor.status !== CursorStatus.DragStart)
    return false
  if (cursor.position.clientX === undefined || cursor.position.clientY === undefined)
    return false
  return viewport.isPointInViewport({
    x: cursor.position.clientX,
    y: cursor.position.clientY,
  }, false)
})
</script>

<template>
  <div
    v-if="isEmpty"
    class="dn-empty"
    :class="{ 'dn-empty--drag-over': isDragOver }"
  >
    <slot :is-drag-over="isDragOver" />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-empty {
  @apply absolute inset-0 flex items-center justify-center;

  background: var(--dn-empty-bg-color, transparent);
  border: 1px dashed transparent;
  pointer-events: none;
  transform: perspective(1px) translate3d(0, 0, 0);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
  z-index: 1;

  &--drag-over {
    @apply border-blue-400 bg-blue-50/70;
  }
}
</style>
