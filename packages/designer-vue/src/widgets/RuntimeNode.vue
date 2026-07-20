<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  node: TreeNode
}>()

const componentName = computed(() => props.node.componentName)
const isContainer = computed(() => props.node.isRoot || props.node.designerProps?.droppable)
</script>

<template>
  <div
    v-bind="$attrs"
    class="dn-runtime-node"
    :class="{
      'dn-runtime-node--container': isContainer,
      'dn-runtime-node--root': node.isRoot,
    }"
  >
    <template v-if="isContainer">
      <slot />
      <div
        v-if="node.children.length === 0"
        class="dn-runtime-node__empty"
      >
        Drop components here
      </div>
    </template>

    <template v-else>
      <div class="dn-runtime-node__fallback">
        <strong>{{ componentName }}</strong>
        <span>Component is not registered in the current preview registry</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-runtime-node {
  @apply bg-white px-4 py-3;
  border-radius: 4px;
  min-height: 40px;
  position: relative;

  &--container {
    @apply border-slate-200 bg-white/80;
    border-width: 1px;
    min-height: 128px;
  }

  &--root {
    @apply my-0 bg-transparent p-0;
    border-radius: 0;
    border-width: 0;
    min-height: 100%;
  }

  &__empty {
    @apply border-slate-300 bg-white/80 px-4 py-3 text-slate-400;
    border-style: dashed;
    border-width: 1px;
    font-size: 14px;
    line-height: 20px;
    min-height: 112px;
  }

  &__fallback {
    @apply border-slate-200 bg-slate-50 px-4 py-3 text-slate-500;
    border-radius: 8px;
    border-width: 1px;
    font-size: 14px;
    line-height: 20px;

    strong {
      @apply text-slate-900;
      display: block;
    }
  }
}
</style>
