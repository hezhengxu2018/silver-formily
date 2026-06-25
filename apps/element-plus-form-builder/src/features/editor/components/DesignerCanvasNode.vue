<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { makeDroppable } from '@vue-dnd-kit/core'
import { computed, useTemplateRef } from 'vue'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'
import DesignerNodePreview from './DesignerNodePreview.vue'

const props = defineProps<{
  node: TreeNode
  root?: boolean
}>()

useObserver()

const { b, prefixCls } = createNamespace('designer-canvas-node')
const elementRef = useTemplateRef<HTMLElement>('element')
const {
  endPaletteDrag,
  getClosestNode,
  getClosestPosition,
  isContainerNode,
  movePaletteDrag,
  selectNode,
} = useEditorDesigner()

const closest = computed(() => getClosestNode()?.id === props.node.id)
const isContainer = computed(() => isContainerNode(props.node))
const closestPosition = computed(() => getClosestPosition())

const { isDragOver } = makeDroppable(
  elementRef,
  {
    data: () => ({
      nodeId: props.node.id,
    }),
    events: {
      onDrop: (event) => {
        endPaletteDrag(event.provider.pointer.value?.current)
        return true
      },
      onEnter: (event) => {
        movePaletteDrag(event.provider.pointer.value?.current)
      },
    },
  },
  () => props.node.children,
)

function handleClick() {
  selectNode(props.node)
}
</script>

<template>
  <section
    ref="element"
    :class="[
      prefixCls,
      b({
        closest,
        container: isContainer,
        dragOver: !!isDragOver,
        root,
      }),
    ]"
    :data-designer-node-id="node.id"
    @click="handleClick"
  >
    <p
      v-if="isContainer && node.children.length === 0"
      :class="b('empty')"
    >
      Drop components here
    </p>

    <template v-if="isContainer">
      <DesignerCanvasNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </template>

    <DesignerNodePreview
      v-else
      :node="node"
      :class="b('preview')"
    />

    <span
      v-if="closest && closestPosition"
      :class="b('drop-indicator', { [`pos-${String(closestPosition).toLowerCase()}`]: true })"
    />
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designer-canvas-node {
  @apply relative border border-transparent transition-all duration-150;

  &--root {
    @apply min-h-full border-transparent bg-transparent;
  }

  &--closest:not(&--selected) {
    @apply border-transparent;
    box-shadow: none;
  }

  &--drag-over:not(&--selected) {
    @apply border-transparent bg-blue-50/25;
    box-shadow: none;
  }

  &--container:not(&--root) {
    @apply py-0.5;
  }

  &__children--empty {
    @apply min-h-28 border border-dashed border-slate-300 bg-white/80 px-4 py-3;
  }

  &__empty {
    @apply min-h-28 border border-dashed border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-400;
  }

  &__preview {
    @apply pointer-events-none;
  }

  &__drop-indicator {
    @apply pointer-events-none absolute inset-x-0 h-0.5 bg-blue-500;

    &--pos-before,
    &--pos-upper {
      @apply left-0 top-0;
    }

    &--pos-after,
    &--pos-under {
      @apply bottom-0 left-0 top-auto;
    }
  }
}
</style>
