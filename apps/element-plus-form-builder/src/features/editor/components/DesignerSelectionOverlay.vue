<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { Copy, Grip, Trash2 } from '@lucide/vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'

const props = defineProps<{
  viewport: HTMLElement | null
}>()

useObserver()

const { b, prefixCls } = createNamespace('designer-selection-overlay')
const {
  duplicateNode,
  engine,
  getNodeDisplayTitle,
  getSelectedNode,
  removeNode,
} = useEditorDesigner()

const helperAttrName = computed(() => engine.props.nodeSelectionIdAttrName)
const dragHandlerAttrName = computed(() => engine.props.nodeDragHandlerAttrName)
const selectedNode = computed(() => {
  const node = getSelectedNode()
  return node?.id === 'form-root' ? null : node
})
const visible = ref(false)
const rect = ref({ height: 0, left: 0, top: 0, width: 0 })

let frameId = 0
let resizeObserver: ResizeObserver | null = null

const nodeType = computed(() => selectedNode.value?.componentName.replace(/\./g, ' ').toUpperCase() ?? '')
const canClone = computed(() => selectedNode.value?.allowClone() ?? false)
const canDelete = computed(() => selectedNode.value?.allowDelete() ?? false)
const canDrag = computed(() => selectedNode.value?.allowDrag() ?? false)

function getTargetElement(node: TreeNode | null) {
  if (!node || !props.viewport)
    return null
  return props.viewport.querySelector<HTMLElement>(`[data-designer-node-id="${node.id}"]`)
}

function updatePosition() {
  const node = selectedNode.value
  const viewport = props.viewport
  const target = getTargetElement(node)
  if (!node || !viewport || !target) {
    visible.value = false
    return
  }

  const viewportRect = viewport.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  rect.value = {
    height: targetRect.height,
    left: targetRect.left - viewportRect.left + viewport.scrollLeft,
    top: targetRect.top - viewportRect.top + viewport.scrollTop,
    width: targetRect.width,
  }
  visible.value = true
}

function scheduleUpdate() {
  cancelAnimationFrame(frameId)
  frameId = requestAnimationFrame(updatePosition)
}

function handleDuplicate() {
  if (selectedNode.value)
    duplicateNode(selectedNode.value)
}

function handleDelete() {
  if (selectedNode.value)
    removeNode(selectedNode.value)
}

onMounted(() => {
  watch(() => [props.viewport, selectedNode.value?.id], async () => {
    await nextTick()
    scheduleUpdate()
  }, { immediate: true })

  window.addEventListener('resize', scheduleUpdate)
  props.viewport?.addEventListener('scroll', scheduleUpdate, { passive: true })

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      scheduleUpdate()
    })
    if (props.viewport)
      resizeObserver.observe(props.viewport)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', scheduleUpdate)
  props.viewport?.removeEventListener('scroll', scheduleUpdate)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    v-if="visible && selectedNode"
    :class="prefixCls"
    :style="{
      height: `${rect.height}px`,
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
    }"
    v-bind="helperAttrName ? { [helperAttrName]: selectedNode.id } : {}"
  >
    <div :class="b('outline')" />

    <div :class="b('toolbar')">
      <div :class="b('toolbar-copy')">
        <span :class="b('toolbar-title')">
          {{ getNodeDisplayTitle(selectedNode) }}
        </span>
        <span :class="b('toolbar-type')">
          {{ nodeType }}
        </span>
      </div>
      <div :class="b('toolbar-actions')">
        <button
          v-if="canClone"
          type="button"
          :class="b('toolbar-button')"
          title="Duplicate node"
          @click.stop="handleDuplicate"
        >
          <Copy :size="14" />
        </button>
        <button
          v-if="canDrag"
          type="button"
          :class="b('toolbar-button', { drag: true })"
          :title="`Drag ${getNodeDisplayTitle(selectedNode)}`"
          v-bind="dragHandlerAttrName ? { [dragHandlerAttrName]: 'true' } : {}"
        >
          <Grip :size="14" />
        </button>
        <button
          v-if="canDelete"
          type="button"
          :class="b('toolbar-button', { danger: true })"
          title="Delete node"
          @click.stop="handleDelete"
        >
          <Trash2 :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designer-selection-overlay {
  @apply pointer-events-none absolute z-20;

  &__outline {
    @apply absolute inset-0 border border-blue-500;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.18);
  }

  &__toolbar {
    @apply pointer-events-none absolute -top-5 right-0 flex items-center gap-2 rounded-lg bg-blue-500 px-2 py-1 text-white shadow-lg shadow-blue-500/20;
  }

  &__toolbar-copy {
    @apply flex items-center gap-2 border-r border-white/20 pr-2;
  }

  &__toolbar-title {
    @apply text-xs font-semibold;
  }

  &__toolbar-type {
    @apply text-[10px] uppercase tracking-[0.18em] text-blue-100;
  }

  &__toolbar-actions {
    @apply pointer-events-auto flex items-center gap-1;
  }

  &__toolbar-button {
    @apply pointer-events-auto inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20;
  }

  &__toolbar-button--drag {
    @apply cursor-move;
  }

  &__toolbar-button--danger:hover {
    background-color: rgba(248, 113, 113, 0.28);
  }
}
</style>
