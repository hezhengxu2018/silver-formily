<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { makeDroppable } from '@vue-dnd-kit/core'
import { computed, useTemplateRef } from 'vue'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'

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
  getNodeDisplayTitle,
  getNodePlaceholder,
  movePaletteDrag,
  getSelectedNode,
  isContainerNode,
  selectNode,
} = useEditorDesigner()

const selected = computed(() => getSelectedNode()?.id === props.node.id)
const closest = computed(() => getClosestNode()?.id === props.node.id)
const isContainer = computed(() => isContainerNode(props.node))
const placeholder = computed(() => getNodePlaceholder(props.node))
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
        selected,
      }),
    ]"
    :data-designer-node-id="node.id"
    @click.stop="handleClick"
  >
    <header
      v-if="!root"
      :class="b('header')"
    >
      <span :class="b('title')">
        {{ getNodeDisplayTitle(node) }}
      </span>
      <span :class="b('type')">
        {{ node.componentName }}
      </span>
    </header>

    <div
      v-if="isContainer"
      :class="b('children', { empty: node.children.length === 0 })"
    >
      <p
        v-if="node.children.length === 0"
        :class="b('empty')"
      >
        Drop components here
      </p>
      <DesignerCanvasNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </div>

    <div
      v-else
      :class="b('field')"
    >
      <strong :class="b('field-title')">
        {{ getNodeDisplayTitle(node) }}
      </strong>
      <span
        v-if="placeholder"
        :class="b('field-placeholder')"
      >
        {{ placeholder }}
      </span>
    </div>

    <span
      v-if="closest && closestPosition"
      :class="b('drop-indicator', { [`pos-${String(closestPosition).toLowerCase()}`]: true })"
    />
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designer-canvas-node {
  @apply relative;

  &--root {
    @apply min-h-full;
  }

  &--selected:not(&--root) {
    @apply ring-2 ring-blue-500/50;
  }

  &--closest:not(&--selected) {
    @apply ring-2 ring-blue-300/60;
  }

  &--drag-over:not(&--selected) {
    @apply ring-2 ring-blue-300/60;
  }

  &--container:not(&--root) {
    @apply rounded-xl border border-slate-200 bg-slate-50/70 p-4;
  }

  &__header {
    @apply mb-3 flex items-center justify-between gap-3;
  }

  &__title {
    @apply text-sm font-semibold text-slate-900;
  }

  &__type {
    @apply text-[11px] uppercase tracking-[0.08em] text-slate-400;
  }

  &__children {
    @apply grid gap-3;
  }

  &__children--empty {
    @apply min-h-28 rounded-lg border border-dashed border-slate-300 bg-white/85 p-4;
  }

  &__empty {
    @apply text-sm text-slate-400;
  }

  &__field {
    @apply rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors;
  }

  &__field-title {
    @apply block text-sm font-semibold text-slate-900;
  }

  &__field-placeholder {
    @apply mt-1 block text-xs text-slate-400;
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
