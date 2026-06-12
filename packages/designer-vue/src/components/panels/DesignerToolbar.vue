<script setup lang="ts">
import { computed } from 'vue'

import { useDesigner, useDesignerCommands } from '../../composables/useDesigner'
import './shared.css'

const context = useDesigner()
const { duplicateNode, removeNode, undo, redo } = useDesignerCommands()

const selectedNode = computed(() => context.selectedNode.value)
const canDelete = computed(() => selectedNode.value && !selectedNode.value.isRoot)
</script>

<template>
  <div class="sf-toolbar">
    <button class="sf-button" type="button" :disabled="!context.canUndo.value" @click="undo()">
      <span data-testid="toolbar-undo" class="sr-only" />
      Undo
    </button>
    <button class="sf-button" type="button" :disabled="!context.canRedo.value" @click="redo()">
      <span data-testid="toolbar-redo" class="sr-only" />
      Redo
    </button>
    <button
      class="sf-button"
      :data-testid="selectedNode ? `toolbar-duplicate-${selectedNode.id}` : 'toolbar-duplicate'"
      type="button"
      :disabled="!selectedNode"
      @click="selectedNode && duplicateNode(selectedNode.id)"
    >
      Duplicate
    </button>
    <button
      class="sf-button sf-button--danger"
      :data-testid="selectedNode ? `toolbar-delete-${selectedNode.id}` : 'toolbar-delete'"
      type="button"
      :disabled="!canDelete"
      @click="selectedNode && removeNode(selectedNode.id)"
    >
      Delete
    </button>
  </div>
</template>

<style scoped>
.sf-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
