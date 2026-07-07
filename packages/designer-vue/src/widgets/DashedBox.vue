<script setup lang="ts">
import { useObserver } from '@silver-formily/reactive-vue'
import { useHover, useSelection, useViewport } from '../hooks'
import { getNodeTitle } from './node-title'

useObserver()

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

function isVisible() {
  const node = getHoverNode()
  const rect = getRect()
  if (!node || node.hidden)
    return false
  if (selectionRef.value?.has(node))
    return false
  return !!rect?.width && !!rect?.height
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

function getHoverTitle() {
  const node = getHoverNode()
  return node ? getNodeTitle(node) : ''
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-dashed-box"
    :style="getBoxStyle()"
  >
    <span class="dn-aux-dashed-box__title">
      {{ getHoverTitle() }}
    </span>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-dashed-box {
  @apply border-blue-400;

  border-style: dashed;
  border-width: 1px;
  box-sizing: border-box;
  pointer-events: none;
  position: absolute;
  z-index: 10;

  &__title {
    @apply bg-blue-500 px-1.5 py-0.5 text-white;

    border-radius: 4px 4px 0 0;
    bottom: 100%;
    font-size: 12px;
    left: -1px;
    line-height: 16px;
    max-width: 180px;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
