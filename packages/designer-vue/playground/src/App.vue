<script setup lang="ts">
import { ComponentTreeWidget, Designer, Viewport, Workspace } from '@silver-formily/designer-vue'
import PlaygroundResourceWidget from './components/PlaygroundResourceWidget.vue'
import { componentRegistry } from './mock/components'
import { engine, resourceGroups } from './mock/designer'
</script>

<template>
  <Designer :engine="engine">
    <main class="pd-shell">
      <header class="pd-shell__header">
        <div>
          <strong>Designer Vue Playground</strong>
          <span>Mock materials for package-level development</span>
        </div>
      </header>

      <section class="pd-shell__workspace">
        <PlaygroundResourceWidget :groups="resourceGroups" />

        <div class="pd-shell__center">
          <Workspace
            id="designer-vue-playground"
            title="Designer Vue Playground"
          >
            <Viewport>
              <ComponentTreeWidget :components="componentRegistry" />
            </Viewport>
          </Workspace>
        </div>
      </section>
    </main>
  </Designer>
</template>
