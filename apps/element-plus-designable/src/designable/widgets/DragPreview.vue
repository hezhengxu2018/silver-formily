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

function getPreviewStyle() {
  const cursor = cursorRef.value?.position
  const viewport = viewportRef.value
  if (!cursor || !viewport)
    return {}

  return {
    left: `${(cursor.topClientX ?? 0) - viewport.offsetX + 14}px`,
    top: `${(cursor.topClientY ?? 0) - viewport.offsetY + 14}px`,
  }
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-drag-preview"
    :style="getPreviewStyle()"
  >
    <span class="dn-drag-preview__dot" />
    <span>{{ getPreviewTitle() }}</span>
  </div>
</template>

<style scoped>
@reference "../../styles/globals.css";

.dn-drag-preview {
  @apply pointer-events-none absolute z-50 inline-flex max-w-56 select-none items-center gap-2 rounded-xl border border-blue-200 bg-white/95 px-3 py-2 text-xs font-semibold text-blue-700 shadow-xl shadow-blue-500/20 backdrop-blur;

  &__dot {
    @apply size-2 shrink-0 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.14)];
  }
}
</style>
