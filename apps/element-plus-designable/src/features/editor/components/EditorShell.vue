<script setup lang="ts">
import { ComponentTreeWidget, Designer, reactiveComputed, Viewport, Workspace } from '@silver-formily/designer-vue'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useEditorSchemaStore } from '@/stores/editorSchema'
import { componentRegistry } from '../componentRegistry'
import { engine, getSchemaDocument, paletteResourceGroups } from '../designer'
import ResourceWidget from './ResourceWidget.vue'
import RuntimeSchemaForm from './RuntimeSchemaForm.vue'
import SchemaPreviewWidget from './SchemaPreviewWidget.vue'

const editorStore = useEditorStore()
const editorSchemaStore = useEditorSchemaStore()
const { viewMode } = storeToRefs(editorStore)
const designerSchemaDocumentRef = reactiveComputed(() => getSchemaDocument())

watch(
  designerSchemaDocumentRef,
  document => editorSchemaStore.syncFromDesigner(document),
  { immediate: true },
)
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

        <div class="epd-designable-shell-center-container">
          <Workspace id="element-plus-designable">
            <div
              v-if="viewMode === 'preview'"
              class="epd-preview-viewport"
            >
              <div class="epd-preview-component-tree">
                <RuntimeSchemaForm class="epd-preview-form" />
              </div>
            </div>

            <Viewport v-else>
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
    min-height: 28.5rem;
    overflow: hidden;
    position: relative;
  }

  &-center-container {
    @apply relative min-w-120 flex-1 bg-slate-100;
  }

  &-center-wrapper {
    @apply absolute inset-0 flex flex-col;
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

.epd-preview-viewport {
  @apply absolute inset-0 mx-auto flex w-full flex-col items-center overflow-y-auto px-16 transition-all duration-300;
}

.epd-preview-component-tree {
  @apply relative mx-auto my-8 w-full rounded-lg bg-white p-10 text-slate-900 transition-all duration-150;

  box-shadow: 0 0 20px 0 rgb(0 0 0 / 8%);
  max-width: calc(432px + 5rem);
}

.epd-preview-form {
  display: block;
  width: 100%;

  :deep(.formily-element-plus-array-table) {
    min-width: 100%;
  }
}
</style>
