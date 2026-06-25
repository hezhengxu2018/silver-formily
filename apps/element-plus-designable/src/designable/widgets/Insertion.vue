<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { useOperation, useViewport } from '../hooks'

useObserver()

const operationRef = useOperation()
const viewportRef = useViewport()

function getClosestNode() {
  return operationRef.value?.getClosestNode() ?? null
}

function getClosestPosition() {
  return operationRef.value?.getClosestPosition() ?? null
}

function getRect() {
  const closestNode = getClosestNode()
  if (!closestNode || !viewportRef.value)
    return null
  return viewportRef.value.getValidNodeOffsetRect(closestNode)
}

function isVisible() {
  return !!getRect() && !!getClosestPosition()
}

function getLineStyle() {
  const currentRect = getRect()
  const position = String(getClosestPosition() ?? '').toLowerCase()
  if (!currentRect)
    return {}

  const top = position.includes('after') || position.includes('under') || position.includes('inner_after')
    ? currentRect.y + currentRect.height
    : currentRect.y

  return {
    left: `${currentRect.x - 4}px`,
    top: `${top}px`,
    width: `${currentRect.width + 8}px`,
  }
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-insertion"
    :style="getLineStyle()"
  >
    <span class="dn-aux-insertion__handle dn-aux-insertion__handle--start" />
    <span class="dn-aux-insertion__line" />
    <span class="dn-aux-insertion__handle dn-aux-insertion__handle--end" />
  </div>
</template>

<style scoped>
@reference "../../styles/globals.css";

.dn-aux-insertion {
  @apply pointer-events-none absolute z-30 flex h-0 -translate-y-1/2 items-center;

  &__line {
    @apply h-1 flex-1 rounded-full bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.16)];
  }

  &__handle {
    @apply size-2 shrink-0 rounded-full border-2 border-blue-500 bg-white shadow-[0_0_0_3px_rgba(59,130,246,0.14)];
  }
}
</style>
