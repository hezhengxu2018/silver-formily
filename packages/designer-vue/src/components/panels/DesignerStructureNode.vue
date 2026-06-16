<script setup lang="ts">
import type { DesignerNode } from '@silver-formily/designer-core'

import { useDesignerNodeInteractions } from '../../composables'

const props = defineProps<{
  node: DesignerNode
}>()

const {
  canDragNode,
  containerEntries,
  getContainerClasses,
  getHandleClasses,
  getInsertionClasses,
  handleContainerDragEnter,
  handleContainerDragLeave,
  handleContainerDragOver,
  handleContainerDrop,
  handleHoverEnter,
  handleHoverLeave,
  handleInsertionDragEnter,
  handleInsertionDragLeave,
  handleInsertionDragOver,
  handleInsertionDrop,
  handleNodeDragEnd,
  handleNodeDragStart,
  handleSelect,
  hasInsertionGuides,
} = useDesignerNodeInteractions(() => props.node)
</script>

<template>
  <li class="sf-structure-node">
    <button
      class="sf-structure-node__button"
      :class="getHandleClasses()"
      :data-testid="`structure-node-${node.id}`"
      :draggable="canDragNode"
      type="button"
      @click="handleSelect"
      @dragstart="handleNodeDragStart"
      @dragend="handleNodeDragEnd"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <span>{{ node.title || node.componentName }}</span>
      <small>{{ node.componentName }}</small>
    </button>

    <div
      v-for="container in containerEntries"
      :key="container.name"
      class="sf-structure-node__slot"
      :class="getContainerClasses(container.name)"
      :data-testid="`structure-container-${node.id}-${container.name}`"
      @dragenter="handleContainerDragEnter($event, container.name)"
      @dragover="handleContainerDragOver($event, container.name)"
      @dragleave="handleContainerDragLeave($event, container.name)"
      @drop="handleContainerDrop($event, container.name)"
    >
      <p class="sf-structure-node__slot-name">
        {{ container.label }}
      </p>
      <ul v-if="container.nodes.length" class="sf-structure-node__children">
        <template v-for="(child, index) in container.nodes" :key="child.id">
          <li
            v-if="hasInsertionGuides(container.name)"
            class="sf-structure-node__insertion"
            :class="getInsertionClasses(container.name, index)"
            :data-testid="`structure-insert-${node.id}-${container.name}-${index}`"
            @dragenter="handleInsertionDragEnter($event, container.name, index)"
            @dragover="handleInsertionDragOver($event, container.name, index)"
            @dragleave="handleInsertionDragLeave($event, container.name, index)"
            @drop="handleInsertionDrop($event, container.name, index)"
          />
          <DesignerStructureNode :node="child" />
        </template>
        <li
          v-if="hasInsertionGuides(container.name)"
          class="sf-structure-node__insertion"
          :class="getInsertionClasses(container.name, container.nodes.length)"
          :data-testid="`structure-insert-${node.id}-${container.name}-${container.nodes.length}`"
          @dragenter="handleInsertionDragEnter($event, container.name, container.nodes.length)"
          @dragover="handleInsertionDragOver($event, container.name, container.nodes.length)"
          @dragleave="handleInsertionDragLeave($event, container.name, container.nodes.length)"
          @drop="handleInsertionDrop($event, container.name, container.nodes.length)"
        />
      </ul>
      <p v-else class="sf-structure-node__empty">
        Ready for nodes
      </p>
    </div>
  </li>
</template>

<style scoped>
.sf-structure-node {
  display: grid;
  gap: 8px;
}

.sf-structure-node__button {
  display: grid;
  justify-items: start;
  gap: 2px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--sf-border);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.78);
  color: var(--sf-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.sf-structure-node__button.is-draggable {
  cursor: grab;
}

.sf-structure-node__button.is-selected {
  border-color: var(--sf-accent);
  background: var(--sf-accent-soft);
}

.sf-structure-node__button.is-hovered:not(.is-selected) {
  border-color: rgba(15, 118, 110, 0.32);
  background: rgba(15, 118, 110, 0.05);
}

.sf-structure-node__button.is-dragging {
  cursor: grabbing;
  opacity: 0.7;
}

.sf-structure-node__button small,
.sf-structure-node__slot-name,
.sf-structure-node__empty {
  font-size: 12px;
  color: var(--sf-text-muted);
}

.sf-structure-node__children {
  display: grid;
  gap: 8px;
  padding-left: 14px;
  margin: 0;
  list-style: none;
}

.sf-structure-node__insertion {
  height: 8px;
  border-radius: 999px;
  background: transparent;
  transition:
    background-color 0.16s ease,
    box-shadow 0.16s ease;
}

.sf-structure-node__insertion.is-active {
  background: rgba(15, 118, 110, 0.18);
  box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.28);
}

.sf-structure-node__slot {
  display: grid;
  gap: 6px;
  padding-left: 14px;
  transition:
    background-color 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;
}

.sf-structure-node__slot.is-drop-target {
  padding: 8px 0 8px 14px;
  border-radius: 6px;
  background: rgba(15, 118, 110, 0.08);
  box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.12);
}

.sf-structure-node__slot.is-hovered:not(.is-drop-target) {
  border-radius: 6px;
  background: rgba(15, 118, 110, 0.03);
}

.sf-structure-node__slot-name,
.sf-structure-node__empty {
  margin: 0;
}
</style>
