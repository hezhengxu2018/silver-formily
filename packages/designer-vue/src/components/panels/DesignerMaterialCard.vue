<script setup lang="ts">
import type { DesignerMaterialDefinition } from '@silver-formily/designer-core'

import { makeDraggable } from '@vue-dnd-kit/core'
import { computed, useTemplateRef } from 'vue'

import { useDesignerDrag } from '../../composables/useDesigner'

const props = defineProps<{
  material: DesignerMaterialDefinition
}>()

const emit = defineEmits<{
  add: []
}>()

const { startMaterialDrag, clearDragSession } = useDesignerDrag()
const cardRef = useTemplateRef<HTMLElement>('card')

const componentName = computed(() => {
  const defaultNode = typeof props.material.defaultNode === 'function'
    ? props.material.defaultNode()
    : props.material.defaultNode

  return props.material.runtimeComponent || defaultNode?.componentName || props.material.name
})

const { isDragging } = makeDraggable(cardRef, {
  data: () => ({
    type: 'material' as const,
    materialName: props.material.name,
    componentName: componentName.value,
  }),
  events: {
    onSelfDragStart() {
      startMaterialDrag(props.material.name, componentName.value)
    },
    onSelfDragEnd() {
      clearDragSession()
    },
    onSelfDragCancel() {
      clearDragSession()
    },
  },
})
</script>

<template>
  <button
    ref="card"
    class="sf-material-card"
    :class="{ 'is-dragging': isDragging }"
    :data-testid="`material-${material.name}`"
    type="button"
    @click="emit('add')"
  >
    <strong>{{ material.title }}</strong>
    <span>{{ material.name }}</span>
  </button>
</template>

<style scoped>
.sf-material-card {
  display: grid;
  gap: 4px;
  align-items: start;
  justify-items: start;
  min-height: 68px;
  padding: 12px;
  border: 1px solid var(--sf-border);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.76);
  color: var(--sf-text);
  font: inherit;
  text-align: left;
  cursor: grab;
  user-select: none;
}

.sf-material-card:hover {
  border-color: var(--sf-accent);
  background: var(--sf-accent-soft);
}

.sf-material-card.is-dragging {
  cursor: grabbing;
  opacity: 0.72;
}

.sf-material-card strong {
  font-size: 13px;
}

.sf-material-card span {
  font-size: 12px;
  color: var(--sf-text-muted);
}
</style>
