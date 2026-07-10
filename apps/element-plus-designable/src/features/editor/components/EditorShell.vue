<script setup lang="ts">
import { Designer, reactiveComputed, Workspace } from '@silver-formily/designer-vue'
import { watch } from 'vue'
import { useEditorSchemaStore } from '@/stores/editorSchema'
import { engine, getSchemaDocument, paletteResourceGroups } from '../designer'
import EditorHeader from './EditorHeader.vue'
import EditorStage from './EditorStage.vue'
import ResourceWidget from './ResourceWidget.vue'
import SchemaPreviewWidget from './SchemaPreviewWidget.vue'

const editorSchemaStore = useEditorSchemaStore()
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
      <EditorHeader />

      <section class="epd-designable-shell__workspace">
        <ResourceWidget :groups="paletteResourceGroups" />

        <div class="epd-designable-shell-center-container">
          <Workspace id="element-plus-designable">
            <EditorStage />
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
</style>
