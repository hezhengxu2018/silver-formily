<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { Copy, Grip, Layers, Trash2 } from '@lucide/vue'
import { TreeNode as TreeNodeModel } from '@silver-formily/designer-core'
import { computed } from 'vue'
import { useDesigner, useSelection } from '../hooks'
import { getNodeTitle } from './node-title'

const props = defineProps<{
  node: TreeNode
}>()

const designerRef = useDesigner()
const selectionRef = useSelection()

const dragHandlerAttrs = computed(() => {
  const attrName = designerRef.value?.props.nodeDragHandlerAttrName
  return attrName ? { [attrName]: 'true' } : {}
})

const parentNodes = computed(() => props.node.getParents().filter(node => node !== props.node))
const nodeType = computed(() => props.node.componentName.replace(/\./g, ' ').toUpperCase())

function handleCopy() {
  TreeNodeModel.clone([props.node])
}

function handleDelete() {
  TreeNodeModel.remove([props.node])
}

function selectNode(node: TreeNode) {
  selectionRef.value?.select(node)
}
</script>

<template>
  <div
    class="dn-aux-helpers"
    @click.stop
  >
    <div class="dn-aux-helpers__selector">
      <button
        type="button"
        class="dn-aux-helpers__title"
      >
        <Layers :size="14" />
        <span>{{ getNodeTitle(node) }}</span>
        <small>{{ nodeType }}</small>
      </button>
      <div
        v-if="parentNodes.length"
        class="dn-aux-helpers__parents"
      >
        <button
          v-for="parent in parentNodes.slice(0, 4)"
          :key="parent.id"
          type="button"
          @click="selectNode(parent)"
        >
          {{ getNodeTitle(parent) }}
        </button>
      </div>
    </div>

    <button
      v-if="node.allowClone()"
      type="button"
      class="dn-aux-helpers__button"
      title="Duplicate node"
      @click="handleCopy"
    >
      <Copy :size="14" />
    </button>

    <button
      v-if="node.allowDrag()"
      type="button"
      class="dn-aux-helpers__button dn-aux-helpers__button--drag"
      title="Drag node"
      v-bind="dragHandlerAttrs"
    >
      <Grip :size="14" />
    </button>

    <button
      v-if="node.allowDelete()"
      type="button"
      class="dn-aux-helpers__button dn-aux-helpers__button--danger"
      title="Delete node"
      @click="handleDelete"
    >
      <Trash2 :size="14" />
    </button>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-helpers {
  @apply pointer-events-auto absolute -top-8 right-0 z-40 flex items-center gap-1 rounded-lg bg-blue-500 px-2 py-1 text-white shadow-lg shadow-blue-500/20;

  &__selector {
    @apply relative border-r border-white/20 pr-1;

    &:hover .dn-aux-helpers__parents {
      @apply block;
    }
  }

  &__title {
    @apply flex h-6 items-center gap-1.5 rounded-md px-1.5 text-xs font-semibold;

    small {
      @apply text-[10px] font-medium uppercase tracking-[0.18em] text-blue-100;
    }
  }

  &__parents {
    @apply absolute left-0 top-full z-50 mt-1 hidden min-w-28 overflow-hidden rounded-md bg-white py-1 text-slate-700 shadow-xl ring-1 ring-slate-200;

    button {
      @apply block w-full px-2 py-1 text-left text-xs hover:bg-blue-50 hover:text-blue-600;
    }
  }

  &__button {
    @apply inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20;
  }

  &__button--drag {
    @apply cursor-move;
  }

  &__button--danger:hover {
    background-color: rgba(248, 113, 113, 0.28);
  }
}
</style>
