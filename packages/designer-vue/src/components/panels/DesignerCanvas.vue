<script setup lang="ts">
import { computed } from 'vue'

import { useDesigner, useDesignerCommands } from '../../composables/useDesigner'
import DesignerCanvasNode from './DesignerCanvasNode.vue'
import './shared.css'

const context = useDesigner()
const { selectNode } = useDesignerCommands()
const rootNode = computed(() => context.designer.value.tree.root)
</script>

<template>
  <section class="sf-panel">
    <header class="sf-panel__header">
      <div>
        <h2 class="sf-panel__title">
          Canvas
        </h2>
        <p class="sf-panel__meta">
          A minimal preview shell backed by designer-core
        </p>
      </div>
    </header>

    <div class="sf-canvas" @click="selectNode(rootNode.id)">
      <DesignerCanvasNode :node="rootNode" />
    </div>
  </section>
</template>

<style scoped>
.sf-canvas {
  min-height: 100%;
  padding: 10px;
  border-radius: 6px;
  background:
    linear-gradient(rgba(82, 66, 46, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(82, 66, 46, 0.04) 1px, transparent 1px);
  background-size: 16px 16px;
}
</style>
