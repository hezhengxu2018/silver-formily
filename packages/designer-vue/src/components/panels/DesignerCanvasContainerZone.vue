<script setup lang="ts">
import type { DesignerNode } from '@silver-formily/designer-core'
import type { IDragEvent } from '@vue-dnd-kit/core'

import { makeDroppable } from '@vue-dnd-kit/core'
import { useTemplateRef } from 'vue'

import { isDesignerMaterialDragSession } from '../../shared/dnd'

const props = defineProps<{
  node: DesignerNode
  containerName: string
}>()

const emit = defineEmits<{
  activate: [containerName: string]
  deactivate: [containerName: string]
  dropMaterial: [payload: { containerName: string, materialName: string }]
}>()

const zoneRef = useTemplateRef<HTMLElement>('zone')

function resolveMaterial(event: IDragEvent) {
  const material = event.draggedItems[0]?.data
  if (!isDesignerMaterialDragSession(material))
    return

  if (!props.node.canAcceptChild(material.componentName, props.containerName))
    return

  return material
}

makeDroppable(zoneRef, {
  data: () => ({
    containerName: props.containerName,
  }),
  events: {
    onEnter(event) {
      if (!resolveMaterial(event))
        return
      emit('activate', props.containerName)
    },
    onLeave() {
      emit('deactivate', props.containerName)
    },
    onDrop(event) {
      const material = resolveMaterial(event)
      if (!material)
        return false

      emit('dropMaterial', {
        containerName: props.containerName,
        materialName: material.materialName,
      })
      return true
    },
  },
})
</script>

<template>
  <section ref="zone">
    <slot />
  </section>
</template>
