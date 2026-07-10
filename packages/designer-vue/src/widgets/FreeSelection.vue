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
  background-color: var(
    --silver-designer-color-primary-soft,
    color-mix(in oklab, var(--silver-designer-color-primary, #2563eb) 10%, transparent)
  );
  border-color: var(--silver-designer-color-primary-border, var(--silver-designer-color-primary, #2563eb));
  border-style: dashed;
  border-width: 1px;
  box-sizing: border-box;
  pointer-events: none;
  position: absolute;
  z-index: 15;
}
</style>
