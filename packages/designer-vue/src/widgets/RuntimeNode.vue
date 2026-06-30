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
  @apply relative my-2 min-h-10 rounded bg-white px-4 py-3;

  &--container {
    @apply min-h-32 border border-slate-200 bg-white/80;
  }

  &--root {
    @apply my-0 min-h-full rounded-none border-0 bg-transparent p-0;
  }

  &__empty {
    @apply min-h-28 border border-dashed border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-400;
  }

  &__fallback {
    @apply rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500;

    strong {
      @apply block text-slate-900;
    }
  }
}
</style>
