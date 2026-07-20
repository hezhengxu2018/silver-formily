<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { Copy, Layers, Trash2 } from '@lucide/vue'
import { TreeNode as TreeNodeModel } from '@silver-formily/designer-core'
import { useObserver } from '@silver-formily/reactive-vue'
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui'
import { computed } from 'vue'
import { useHover, useSelection } from '../hooks'
import { reactiveComputed } from '../shared/reactive'
import { getNodeTitle } from './node-title'

const props = defineProps<{
  node: TreeNode
}>()

useObserver()

const hoverRef = useHover()
const selectionRef = useSelection()

const titleRef = reactiveComputed(() => getNodeTitle(props.node))
const parentNodes = computed(() => props.node.getParents().filter(node => node !== props.node))

function handleCopy() {
  TreeNodeModel.clone([props.node])
}

function handleDelete() {
  TreeNodeModel.remove([props.node])
}

function selectNode(node: TreeNode) {
  selectionRef.value?.select(node)
}

function setHoverNode(node: TreeNode) {
  hoverRef.value?.setHover(node)
}
</script>

<template>
  <div
    class="dn-aux-helpers"
    @click.stop
  >
    <HoverCardRoot
      :open-delay="100"
      :close-delay="100"
    >
      <HoverCardTrigger as-child>
        <button
          type="button"
          class="dn-aux-helpers__title"
          @mouseenter="setHoverNode(node)"
        >
          <Layers :size="12" />
          <span>{{ titleRef }}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardPortal v-if="parentNodes.length">
        <HoverCardContent
          class="dn-aux-helpers__parents"
          side="bottom"
          align="start"
          :side-offset="2"
          @mousedown.stop
          @pointerdown.stop
          @click.stop
        >
          <button
            v-for="parent in parentNodes.slice(0, 4)"
            :key="parent.id"
            type="button"
            @mousedown.stop
            @pointerdown.stop
            @click.stop="selectNode(parent)"
            @mouseenter="setHoverNode(parent)"
          >
            {{ getNodeTitle(parent) }}
          </button>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <div class="dn-aux-helpers__button-wrapper">
      <button
        v-if="node.allowClone()"
        type="button"
        class="dn-aux-helpers__button"
        title="Duplicate node"
        @click="handleCopy"
      >
        <Copy :size="10" />
      </button>
      <button
        v-if="node.allowDelete()"
        type="button"
        class="dn-aux-helpers__button dn-aux-helpers__button--danger"
        title="Delete node"
        @click="handleDelete"
      >
        <Trash2 :size="10" />
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "../styles/globals.css";

.dn-aux-helpers {
  align-items: flex-end;
  color: var(--silver-designer-color-primary-foreground, #fff);
  display: flex;
  pointer-events: auto;
  position: absolute;
  right: 0;
  top: -20px;
  z-index: 2;

  &__title {
    align-items: center;
    display: flex;
    font-size: 12px;
    gap: 6px;
    height: 20px;
    line-height: 16px;
    padding-left: 6px;
    padding-right: 6px;
    background-color: var(--silver-designer-color-primary, #2563eb);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &__button-wrapper {
    display: flex;
    gap: 4px;
    margin-left: 8px;
  }

  &__button {
    @apply text-white;
    background-color: var(--silver-designer-color-primary, #2563eb);
    align-items: center;
    display: inline-flex;
    height: 16px;
    width: 16px;
    justify-content: center;
    cursor: pointer;
  }
}

:global(.dn-aux-helpers__parents) {
  background-color: var(
    --silver-designer-color-primary-softer,
    color-mix(in oklab, var(--silver-designer-color-primary, #2563eb) 8%, white)
  );
  border: 1px solid var(--silver-designer-color-primary-border, var(--silver-designer-color-primary, #2563eb));
  border-radius: 4px;
  box-shadow:
    0 10px 18px -10px rgb(37 99 235 / 0.35),
    0 2px 6px -3px rgb(15 23 42 / 0.22);
  color: var(--silver-designer-color-primary, #2563eb);
  max-width: 160px;
  min-width: 96px;
  overflow: hidden;
  padding-bottom: 2px;
  padding-top: 2px;
  z-index: 50;
}

:global(.dn-aux-helpers__parents button) {
  align-items: center;
  color: inherit;
  display: block;
  font-size: 11px;
  line-height: 14px;
  min-height: 18px;
  overflow: hidden;
  padding: 2px 8px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

:global(.dn-aux-helpers__parents button:hover) {
  background-color: var(--silver-designer-color-primary, #2563eb);
  color: var(--silver-designer-color-primary-foreground, #fff);
}
</style>
