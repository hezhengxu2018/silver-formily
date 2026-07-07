<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { toRef } from 'vue'
import { useDesigner, useValidNodeOffsetRect } from '../hooks'
import Helpers from './Helpers.vue'

const props = defineProps<{
  node: TreeNode
  showHelpers: boolean
}>()

useObserver()

const designerRef = useDesigner()
const rectRef = useValidNodeOffsetRect(toRef(props, 'node'))

function getRect() {
  return rectRef.value
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
    left: '0',
    top: '0',
    transform: `perspective(1px) translate3d(${rect.x}px, ${rect.y}px, 0)`,
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
    :class="{ 'dn-aux-selection-box--root': node.isRoot }"
    :style="getBoxStyle()"
    v-bind="getHelperAttrs()"
  >
    <div class="dn-aux-selection-box__fill" />
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
  box-sizing: border-box;
  position: absolute;
  z-index: 20;

  &__fill {
    @apply bg-blue-500/10;
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  &__outline {
    @apply border-blue-500;
    border-width: 1px;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.18);
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  &--root &__fill {
    display: none;
  }
}
</style>
