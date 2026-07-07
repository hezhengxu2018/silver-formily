<script setup lang="ts">
import { CursorStatus, CursorType } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useCursor, useViewport } from '../hooks'

useObserver()

const cursorRef = useCursor()
const viewportRef = useViewport()

function isVisible() {
  const cursor = cursorRef.value
  return cursor?.type === CursorType.Selection
    && !!cursor.dragStartPosition
    && (
      cursor.status === CursorStatus.DragStart
      || cursor.status === CursorStatus.Dragging
    )
}

function getSelectionStyle() {
  const cursor = cursorRef.value
  const viewport = viewportRef.value
  if (!cursor?.dragStartPosition || !viewport)
    return {}

  const start = viewport.getOffsetPoint({
    x: cursor.dragStartPosition.topClientX ?? 0,
    y: cursor.dragStartPosition.topClientY ?? 0,
  })
  const current = viewport.getOffsetPoint({
    x: cursor.position.topClientX ?? 0,
    y: cursor.position.topClientY ?? 0,
  })
  const left = Math.min(start.x, current.x)
  const top = Math.min(start.y, current.y)
  const width = Math.abs(current.x - start.x)
  const height = Math.abs(current.y - start.y)

  return {
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
  }
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-free-selection"
    :style="getSelectionStyle()"
  />
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-free-selection {
  @apply border-blue-500 bg-blue-500/10;

  border-style: dashed;
  border-width: 1px;
  box-sizing: border-box;
  pointer-events: none;
  position: absolute;
  z-index: 15;
}
</style>
