<script setup lang="ts">
import { ComponentTreeWidget, Designer, Viewport, Workspace } from '@silver-formily/designer-vue'
import { componentRegistry } from '../componentRegistry'
import { engine, paletteResourceGroups } from '../designer'
import ResourceWidget from './ResourceWidget.vue'
import SchemaPreviewWidget from './SchemaPreviewWidget.vue'
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

        <SchemaPreviewWidget />
      </section>
    </main>
  </Designer>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designable-shell {
  @apply bg-slate-100 text-slate-950;

  min-height: 100vh;
  padding-top: var(--editor-header-height);

  &__header {
    @apply border-slate-200 bg-white px-5;

    align-items: center;
    border-bottom-width: 1px;
    display: flex;
    height: var(--editor-header-height);
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 30;

    strong {
      display: block;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
    }

    span {
      @apply text-slate-500;

      display: block;
      font-size: 12px;
      line-height: 16px;
    }
  }

  &__workspace {
    display: flex;
    height: calc(100vh - var(--editor-header-height));
    overflow: hidden;
    position: relative;
  }

  &__center {
    @apply px-6;

    flex: 1 1 0%;
    min-height: 0;
    min-width: 480px;
    overflow: hidden;
    position: relative;
  }
}
</style>
