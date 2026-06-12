<script setup lang="ts">
import type { DesignerNode } from '@silver-formily/designer-core'

import { computed } from 'vue'

import { useDesigner, useDesignerCommands } from '../../composables/useDesigner'

const props = defineProps<{
  node: DesignerNode
}>()

const context = useDesigner()
const { selectNode } = useDesignerCommands()

const isSelected = computed(() => context.snapshot.value.selectedId === props.node.id)

const slotEntries = computed(() => Object.entries(props.node.slots || {}))
</script>

<template>
  <li class="sf-structure-node">
    <button
      class="sf-structure-node__button"
      :class="{ 'is-selected': isSelected }"
      :data-testid="`structure-node-${node.id}`"
      type="button"
      @click="selectNode(node.id)"
    >
      <span>{{ node.title || node.componentName }}</span>
      <small>{{ node.componentName }}</small>
    </button>

    <ul v-if="node.children.length" class="sf-structure-node__children">
      <DesignerStructureNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </ul>

    <div v-for="[slotName, nodes] in slotEntries" :key="slotName" class="sf-structure-node__slot">
      <p class="sf-structure-node__slot-name">
        {{ slotName }}
      </p>
      <ul v-if="nodes.length" class="sf-structure-node__children">
        <DesignerStructureNode
          v-for="child in nodes"
          :key="child.id"
          :node="child"
        />
      </ul>
      <p v-else class="sf-structure-node__empty">
        Empty slot
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

.sf-structure-node__button.is-selected {
  border-color: var(--sf-accent);
  background: var(--sf-accent-soft);
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

.sf-structure-node__slot {
  display: grid;
  gap: 6px;
  padding-left: 14px;
}

.sf-structure-node__slot-name,
.sf-structure-node__empty {
  margin: 0;
}
</style>
