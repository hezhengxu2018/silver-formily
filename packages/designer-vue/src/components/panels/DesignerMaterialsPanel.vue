<script setup lang="ts">
import { computed } from 'vue'

import { useDesigner } from '../../composables/useDesigner'
import { resolveInsertionTarget } from '../../shared/resolveInsertion'
import DesignerMaterialCard from './DesignerMaterialCard.vue'
import './shared.css'

const context = useDesigner()
const groups = computed(() => context.materialGroups.value)

function handleAddMaterial(name: string) {
  const designer = context.designer.value
  const schema = designer.createNodeFromMaterial(name)
  designer.insertNode(schema, resolveInsertionTarget(designer, schema.componentName))
}
</script>

<template>
  <section class="sf-panel">
    <header class="sf-panel__header">
      <div>
        <h2 class="sf-panel__title">
          Materials
        </h2>
        <p class="sf-panel__meta">
          Registered from the current designer instance
        </p>
      </div>
    </header>

    <div v-if="groups.length" class="sf-material-groups">
      <section v-for="group in groups" :key="group.name" class="sf-material-group">
        <header class="sf-material-group__header">
          <h3>{{ group.name }}</h3>
          <span>{{ group.materials.length }}</span>
        </header>
        <div class="sf-material-grid">
          <DesignerMaterialCard
            v-for="material in group.materials"
            :key="material.name"
            :material="material"
            @add="handleAddMaterial(material.name)"
          />
        </div>
      </section>
    </div>

    <p v-else class="sf-panel__meta">
      No materials registered yet.
    </p>
  </section>
</template>

<style scoped>
.sf-material-groups {
  display: grid;
  gap: 14px;
}

.sf-material-group {
  display: grid;
  gap: 10px;
}

.sf-material-group__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  color: var(--sf-text-muted);
}

.sf-material-group__header h3 {
  margin: 0;
  font-size: 13px;
  color: var(--sf-text);
}

.sf-material-grid {
  display: grid;
  gap: 8px;
}
</style>
