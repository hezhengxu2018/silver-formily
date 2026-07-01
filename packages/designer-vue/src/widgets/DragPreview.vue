<script setup lang="ts">
import { CursorStatus } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useCursor, useMoveHelper, useViewport } from '../hooks'
import { getNodeTitle } from './node-title'

useObserver()

const cursorRef = useCursor()
const moveHelperRef = useMoveHelper()
const viewportRef = useViewport()

function getDragNodes() {
  return moveHelperRef.value?.dragNodes ?? []
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
    return `${getNodeTitle(firstNode)} +${dragNodes.length - 1}`
  return getNodeTitle(firstNode)
}

function getGhostSize() {
  const viewport = viewportRef.value
  const [firstNode] = getDragNodes()
  const rect = firstNode && !firstNode.isSourceNode
    ? viewport?.getValidNodeOffsetRect(firstNode)
    : null
  const width = Math.max(Math.round(rect?.width ?? 180), 80)
  const height = Math.max(Math.round(rect?.height ?? 44), 32)

  return {
    height,
    width,
  }
}

function getDragNodeRect() {
  const viewport = viewportRef.value
  const [firstNode] = getDragNodes()
  if (!viewport || !firstNode || firstNode.isSourceNode)
    return null
  return viewport.getValidNodeOffsetRect(firstNode) ?? null
}

function getPreviewStyle() {
  const cursor = cursorRef.value
  const cursorPosition = cursor?.position
  const viewport = viewportRef.value
  if (!cursorPosition || !viewport)
    return {}
  const { height, width } = getGhostSize()
  const rect = getDragNodeRect()
  const startPosition = cursor.dragStartPosition
  const currentTopClientX = cursorPosition.topClientX ?? startPosition?.topClientX ?? 0
  const currentTopClientY = cursorPosition.topClientY ?? startPosition?.topClientY ?? 0
  const startTopClientX = startPosition?.topClientX ?? currentTopClientX
  const startTopClientY = startPosition?.topClientY ?? currentTopClientY

  if (rect) {
    return {
      height: `${height}px`,
      left: `${rect.x + currentTopClientX - startTopClientX}px`,
      top: `${rect.y + currentTopClientY - startTopClientY}px`,
      width: `${width}px`,
    }
  }

  const cursorX = currentTopClientX - viewport.offsetX
  const cursorY = currentTopClientY - viewport.offsetY

  return {
    height: `${height}px`,
    left: `${cursorX - width / 2}px`,
    top: `${cursorY - Math.min(height / 2, 24)}px`,
    width: `${width}px`,
  }
}

function getPreviewSizeText() {
  const { height, width } = getGhostSize()
  return `${width} x ${height}`
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-drag-preview"
    :style="getPreviewStyle()"
  >
    <div class="dn-drag-preview__surface">
      <span class="dn-drag-preview__title">{{ getPreviewTitle() }}</span>
      <span class="dn-drag-preview__size">{{ getPreviewSizeText() }}</span>
    </div>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-drag-preview {
  @apply pointer-events-none absolute z-50 select-none rounded-lg border-2 border-blue-500 bg-blue-500/20 shadow-[0_0_0_3px_rgba(59,130,246,0.14)];

  &__surface {
    @apply flex h-full w-full min-w-0 items-start justify-between gap-2 rounded-md px-2 py-1 text-[11px] font-semibold text-blue-700;
  }

  &__title {
    @apply min-w-0 truncate;
  }

  &__size {
    @apply shrink-0 font-mono text-blue-500;
  }
}
</style>
