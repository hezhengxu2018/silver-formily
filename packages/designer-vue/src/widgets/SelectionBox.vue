<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { useDesigner, useViewport } from '../hooks'
import Helpers from './Helpers.vue'

const props = defineProps<{
  node: TreeNode
  showHelpers: boolean
}>()

useObserver()

const designerRef = useDesigner()
const viewportRef = useViewport()

function getRect() {
  return viewportRef.value?.getValidNodeOffsetRect(props.node) ?? null
}

function getHelperAttrs() {
  const attrName = designerRef.value?.props.nodeSelectionIdAttrName
  return attrName ? { [attrName]: props.node.id } : {}
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
  const rect = getRect()
  return !!rect?.width && !!rect?.height
}
</script>

<template>
  <div
    v-if="isVisible()"
    class="dn-aux-selection-box"
    :style="getBoxStyle()"
    v-bind="getHelperAttrs()"
  >
    <div class="dn-aux-selection-box__outline" />
    <Helpers
      v-if="showHelpers"
      :node="node"
    />
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-selection-box {
  @apply pointer-events-none absolute z-20 box-border;

  &__outline {
    @apply absolute inset-0 border border-blue-500;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.18);
  }
}
</style>
