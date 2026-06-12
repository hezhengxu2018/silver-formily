<script setup lang="ts">
import type { DesignerNode } from '@silver-formily/designer-core'

import { computed, resolveDynamicComponent } from 'vue'

import { useDesigner, useDesignerCommands } from '../../composables/useDesigner'

const props = defineProps<{
  node: DesignerNode
}>()

const context = useDesigner()
const { selectNode } = useDesignerCommands()

const isSelected = computed(() => context.snapshot.value.selectedId === props.node.id)
const slotEntries = computed(() => Object.entries(props.node.slots || {}))
const previewComponent = computed(() => {
  return context.previewComponents[props.node.componentName]
})

function handleSelect() {
  selectNode(props.node.id)
}
</script>

<template>
  <article
    class="sf-canvas-node"
    :class="{ 'is-selected': isSelected }"
    @click.stop="handleSelect"
  >
    <header class="sf-canvas-node__header">
      <strong>{{ node.title || node.componentName }}</strong>
      <span>{{ node.componentName }}</span>
    </header>

    <div v-if="previewComponent" class="sf-canvas-node__preview">
      <component :is="resolveDynamicComponent(previewComponent)" v-bind="node.props || {}" />
    </div>

    <section v-if="node.children.length" class="sf-canvas-node__children">
      <DesignerCanvasNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </section>

    <section
      v-for="[slotName, nodes] in slotEntries"
      :key="slotName"
      class="sf-canvas-node__slot"
    >
      <header class="sf-canvas-node__slot-header">
        {{ slotName }}
      </header>
      <div v-if="nodes.length" class="sf-canvas-node__children">
        <DesignerCanvasNode
          v-for="child in nodes"
          :key="child.id"
          :node="child"
        />
      </div>
      <p v-else class="sf-canvas-node__empty">
        Drop content here
      </p>
    </section>
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

.sf-canvas-node__header,
.sf-canvas-node__slot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.sf-canvas-node__header span,
.sf-canvas-node__slot-header,
.sf-canvas-node__empty {
  font-size: 12px;
  color: var(--sf-text-muted);
}

.sf-canvas-node__children {
  display: grid;
  gap: 8px;
}

.sf-canvas-node__preview {
  padding: 10px;
  border: 1px solid rgba(82, 66, 46, 0.08);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.72);
}

.sf-canvas-node__slot {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px dashed var(--sf-border-strong);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.54);
}

.sf-canvas-node__empty {
  margin: 0;
}
</style>
