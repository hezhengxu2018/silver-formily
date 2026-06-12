<script setup lang="ts">
import { computed } from 'vue'

import { useDesigner } from '../../composables/useDesigner'
import DesignerStructureNode from './DesignerStructureNode.vue'
import './shared.css'

const context = useDesigner()
const rootNode = computed(() => context.designer.value.tree.root)
</script>

<template>
  <section class="sf-panel">
    <header class="sf-panel__header">
      <div>
        <h2 class="sf-panel__title">
          Structure
        </h2>
        <p class="sf-panel__meta">
          Current node tree and slot hierarchy
        </p>
      </div>
    </header>
    <ul class="sf-structure-root">
      <DesignerStructureNode :node="rootNode" />
    </ul>
  </section>
</template>

<style scoped>
.sf-structure-root {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
