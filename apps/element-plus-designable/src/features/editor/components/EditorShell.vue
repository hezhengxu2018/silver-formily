<script setup lang="ts">
import { ComponentTreeWidget, Designer, Viewport, Workspace } from '@silver-formily/designer-vue'
import { componentRegistry } from '../componentRegistry'
import { engine, paletteResourceGroups } from '../designer'
import ResourceWidget from './ResourceWidget.vue'
</script>

<template>
  <Designer :engine="engine">
    <main class="epd-designable-shell">
      <header class="epd-designable-shell__header">
        <div>
          <strong>Element Plus Designable</strong>
          <span>Official structure prototype</span>
        </div>
      </header>

      <section class="epd-designable-shell__workspace">
        <ResourceWidget :groups="paletteResourceGroups" />

        <div class="epd-designable-shell__center">
          <Workspace id="element-plus-designable">
            <Viewport>
              <ComponentTreeWidget :components="componentRegistry" />
            </Viewport>
          </Workspace>
        </div>
      </section>
    </main>
  </Designer>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designable-shell {
  @apply min-h-screen bg-slate-100 pt-[var(--editor-header-height)] text-slate-950;

  &__header {
    @apply fixed inset-x-0 top-0 z-30 flex h-[var(--editor-header-height)] items-center border-b border-slate-200 bg-white px-5;

    strong {
      @apply block text-sm font-semibold;
    }

    span {
      @apply block text-xs text-slate-500;
    }
  }

  &__workspace {
    @apply relative flex h-[calc(100vh-var(--editor-header-height))] overflow-hidden;
  }

  &__center {
    @apply relative min-w-[30rem] flex-1 px-6;
  }
}
</style>
