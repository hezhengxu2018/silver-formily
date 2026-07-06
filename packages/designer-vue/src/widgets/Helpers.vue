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
  @apply gap-1 bg-blue-500 px-2 py-1 text-white;
  align-items: center;
  border-radius: 8px;
  box-shadow:
    0 10px 15px -3px rgb(59 130 246 / 0.2),
    0 4px 6px -4px rgb(59 130 246 / 0.2);
  display: flex;
  pointer-events: auto;
  position: absolute;
  right: 0;
  top: -32px;
  z-index: 40;

  &__selector {
    @apply border-white/20 pr-1;
    border-right-width: 1px;
    position: relative;

    &:hover .dn-aux-helpers__parents {
      display: block;
    }
  }

  &__title {
    align-items: center;
    border-radius: 6px;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    gap: 6px;
    height: 24px;
    line-height: 16px;
    padding-left: 6px;
    padding-right: 6px;

    small {
      @apply text-blue-100;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  }

  &__parents {
    @apply mt-1 bg-white py-1 text-slate-700 ring-slate-200;
    border-radius: 6px;
    box-shadow:
      var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow),
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    display: none;
    left: 0;
    min-width: 112px;
    overflow: hidden;
    position: absolute;
    top: 100%;
    z-index: 50;
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 0 calc(1px + var(--tw-ring-offset-width, 0px)) var(--tw-ring-color);

    button {
      @apply px-2 py-1 hover:bg-blue-50 hover:text-blue-600;
      display: block;
      font-size: 12px;
      line-height: 16px;
      text-align: left;
      width: 100%;
    }
  }

  &__button {
    @apply border-white/15 bg-white/10 text-white hover:bg-white/20;
    align-items: center;
    border-radius: 6px;
    border-width: 1px;
    display: inline-flex;
    height: 24px;
    justify-content: center;
    transition-duration: 150ms;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    width: 24px;
  }

  &__button--drag {
    cursor: move;
  }

  &__button--danger:hover {
    background-color: rgba(248, 113, 113, 0.28);
  }
}
</style>
