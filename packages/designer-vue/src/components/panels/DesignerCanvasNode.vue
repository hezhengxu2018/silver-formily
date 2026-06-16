<script setup lang="ts">
import type { DesignerNode } from '@silver-formily/designer-core'

import { computed, resolveDynamicComponent } from 'vue'

import { useDesigner, useDesignerNodeInteractions } from '../../composables'
import DesignerCanvasContainerZone from './DesignerCanvasContainerZone.vue'
import DesignerCanvasInsertionZone from './DesignerCanvasInsertionZone.vue'

const props = defineProps<{
  node: DesignerNode
}>()

const {
  canDragNode,
  containerEntries,
  clearActiveInsertion,
  getContainerClasses,
  getHandleClasses,
  getInsertionClasses,
  getNodeClasses,
  insertMaterial,
  handleContainerDragEnter: handleDragEnter,
  handleContainerDragLeave: handleDragLeave,
  handleContainerDragOver: handleDragOver,
  handleContainerDrop: handleDrop,
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
  setActiveContainer,
  setActiveInsertion,
} = useDesignerNodeInteractions(() => props.node)
const previewContext = useDesigner()
const previewComponent = computed(() => {
  return previewContext.previewComponents[props.node.componentName]
})

function handleMaterialContainerDrop(payload: { containerName: string, materialName: string }) {
  insertMaterial(payload.materialName, payload.containerName)
}

function handleMaterialInsertionDrop(payload: { containerName: string, index: number, materialName: string }) {
  insertMaterial(payload.materialName, payload.containerName, payload.index)
}
</script>

<template>
  <article
    class="sf-canvas-node"
    :class="getNodeClasses()"
    :data-testid="`canvas-node-${node.id}`"
    @click.stop="handleSelect"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
  >
    <header
      class="sf-canvas-node__header"
      :class="getHandleClasses()"
      :data-testid="canDragNode ? `canvas-node-drag-${node.id}` : undefined"
      :draggable="canDragNode"
      @dragstart="handleNodeDragStart"
      @dragend="handleNodeDragEnd"
    >
      <strong>{{ node.title || node.componentName }}</strong>
      <span>{{ node.componentName }}</span>
    </header>

    <div v-if="previewComponent" class="sf-canvas-node__preview">
      <component :is="resolveDynamicComponent(previewComponent)" v-bind="node.props || {}" />
    </div>

    <DesignerCanvasContainerZone
      v-for="container in containerEntries"
      :key="container.name"
      :node="node"
      :container-name="container.name"
      class="sf-canvas-node__container"
      :class="getContainerClasses(container.name)"
      :data-testid="`canvas-container-${node.id}-${container.name}`"
      @activate="setActiveContainer"
      @deactivate="setActiveContainer(undefined)"
      @drop-material="handleMaterialContainerDrop"
      @dragenter="handleDragEnter($event, container.name)"
      @dragover="handleDragOver($event, container.name)"
      @dragleave="handleDragLeave($event, container.name)"
      @drop="handleDrop($event, container.name)"
    >
      <header class="sf-canvas-node__container-header">
        {{ container.label }}
      </header>
      <div v-if="container.nodes.length" class="sf-canvas-node__children">
        <template v-for="(child, index) in container.nodes" :key="child.id">
          <DesignerCanvasInsertionZone
            v-if="hasInsertionGuides(container.name)"
            :node="node"
            :container-name="container.name"
            :index="index"
            class="sf-canvas-node__insertion"
            :class="getInsertionClasses(container.name, index)"
            :data-testid="`canvas-insert-${node.id}-${container.name}-${index}`"
            aria-label="Insert before"
            @activate="setActiveInsertion($event.containerName, $event.index)"
            @deactivate="clearActiveInsertion($event.containerName, $event.index)"
            @drop-material="handleMaterialInsertionDrop"
            @dragenter="handleInsertionDragEnter($event, container.name, index)"
            @dragover="handleInsertionDragOver($event, container.name, index)"
            @dragleave="handleInsertionDragLeave($event, container.name, index)"
            @drop="handleInsertionDrop($event, container.name, index)"
          />
          <DesignerCanvasNode :node="child" />
        </template>
        <DesignerCanvasInsertionZone
          v-if="hasInsertionGuides(container.name)"
          :node="node"
          :container-name="container.name"
          :index="container.nodes.length"
          class="sf-canvas-node__insertion"
          :class="getInsertionClasses(container.name, container.nodes.length)"
          :data-testid="`canvas-insert-${node.id}-${container.name}-${container.nodes.length}`"
          aria-label="Insert after"
          @activate="setActiveInsertion($event.containerName, $event.index)"
          @deactivate="clearActiveInsertion($event.containerName, $event.index)"
          @drop-material="handleMaterialInsertionDrop"
          @dragenter="handleInsertionDragEnter($event, container.name, container.nodes.length)"
          @dragover="handleInsertionDragOver($event, container.name, container.nodes.length)"
          @dragleave="handleInsertionDragLeave($event, container.name, container.nodes.length)"
          @drop="handleInsertionDrop($event, container.name, container.nodes.length)"
        />
      </div>
      <p v-else class="sf-canvas-node__empty">
        Ready for components
      </p>
    </DesignerCanvasContainerZone>
  </article>
</template>

<style scoped>
.sf-canvas-node {
  display: grid;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--sf-border);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.85);
  cursor: pointer;
}

.sf-canvas-node.is-selected {
  border-color: var(--sf-accent);
  box-shadow: inset 0 0 0 1px var(--sf-accent);
  background: var(--sf-accent-soft);
}

.sf-canvas-node.is-hovered:not(.is-selected) {
  border-color: rgba(15, 118, 110, 0.38);
  background: rgba(15, 118, 110, 0.05);
}

.sf-canvas-node.is-dragging {
  opacity: 0.7;
}

.sf-canvas-node__header,
.sf-canvas-node__container-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.sf-canvas-node__header.is-draggable {
  cursor: grab;
}

.sf-canvas-node__header.is-hovered {
  color: var(--sf-accent);
}

.sf-canvas-node__header.is-dragging {
  cursor: grabbing;
}

.sf-canvas-node__header span,
.sf-canvas-node__container-header,
.sf-canvas-node__empty {
  font-size: 12px;
  color: var(--sf-text-muted);
}

.sf-canvas-node__children {
  display: grid;
  gap: 8px;
}

.sf-canvas-node__insertion {
  width: 100%;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: copy;
  transition:
    background-color 0.16s ease,
    box-shadow 0.16s ease;
}

.sf-canvas-node__insertion.is-active {
  background: rgba(15, 118, 110, 0.18);
  box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.28);
}

.sf-canvas-node__preview {
  padding: 10px;
  border: 1px solid rgba(82, 66, 46, 0.08);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.72);
}

.sf-canvas-node__container {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px dashed var(--sf-border-strong);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.54);
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease,
    box-shadow 0.16s ease;
}

.sf-canvas-node__container.is-drop-target {
  border-color: var(--sf-accent);
  background: rgba(15, 118, 110, 0.1);
  box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.16);
}

.sf-canvas-node__container.is-hovered:not(.is-drop-target) {
  border-color: rgba(15, 118, 110, 0.18);
}

.sf-canvas-node__empty {
  margin: 0;
}
</style>
