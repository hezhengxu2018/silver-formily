<script setup lang="ts">
import type { DesignerWorkbenchProps } from '../types'

import DesignerProvider from './DesignerProvider'
import DesignerCanvas from './panels/DesignerCanvas.vue'
import DesignerMaterialsPanel from './panels/DesignerMaterialsPanel.vue'
import DesignerPropertiesPanel from './panels/DesignerPropertiesPanel.vue'
import DesignerStructurePanel from './panels/DesignerStructurePanel.vue'
import DesignerToolbar from './panels/DesignerToolbar.vue'

withDefaults(defineProps<DesignerWorkbenchProps>(), {
  title: 'Silver Form Designer',
})
</script>

<template>
  <DesignerProvider :designer="designer" :preview-components="previewComponents">
    <section class="sf-designer">
      <header class="sf-designer__header">
        <div>
          <p class="sf-designer__eyebrow">
            Designer
          </p>
          <h1 class="sf-designer__title">
            {{ title }}
          </h1>
        </div>
        <DesignerToolbar />
      </header>
      <div class="sf-designer__body">
        <aside class="sf-designer__sidebar">
          <DesignerMaterialsPanel />
        </aside>
        <main class="sf-designer__canvas-shell">
          <DesignerStructurePanel />
          <DesignerCanvas />
        </main>
        <aside class="sf-designer__sidebar">
          <DesignerPropertiesPanel />
        </aside>
      </div>
    </section>
  </DesignerProvider>
</template>

<style scoped>
.sf-designer {
  --sf-bg: #f5efe6;
  --sf-panel: rgba(255, 253, 249, 0.9);
  --sf-border: rgba(82, 66, 46, 0.18);
  --sf-border-strong: rgba(82, 66, 46, 0.32);
  --sf-text: #2a2118;
  --sf-text-muted: #74624e;
  --sf-accent: #0f766e;
  --sf-accent-soft: rgba(15, 118, 110, 0.12);
  --sf-shadow: 0 16px 40px rgba(79, 55, 22, 0.08);
  display: grid;
  gap: 16px;
  min-height: 720px;
  padding: 20px;
  color: var(--sf-text);
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.75), transparent 35%),
    linear-gradient(180deg, #fcf8f2 0%, var(--sf-bg) 100%);
}

.sf-designer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.sf-designer__eyebrow {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sf-text-muted);
}

.sf-designer__title {
  margin: 0;
  font-size: 26px;
  line-height: 1.1;
}

.sf-designer__body {
  display: grid;
  grid-template-columns: minmax(240px, 260px) minmax(0, 1fr) minmax(280px, 320px);
  gap: 16px;
  min-height: 0;
}

.sf-designer__sidebar,
.sf-designer__canvas-shell {
  min-height: 680px;
}

.sf-designer__sidebar {
  display: grid;
}

.sf-designer__canvas-shell {
  display: grid;
  grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
  gap: 16px;
}

@media (max-width: 1160px) {
  .sf-designer__body {
    grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
  }

  .sf-designer__sidebar:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 840px) {
  .sf-designer {
    padding: 14px;
  }

  .sf-designer__header,
  .sf-designer__body,
  .sf-designer__canvas-shell {
    grid-template-columns: 1fr;
  }

  .sf-designer__sidebar,
  .sf-designer__canvas-shell {
    min-height: auto;
  }
}
</style>
