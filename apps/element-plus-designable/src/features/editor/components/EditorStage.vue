<script setup lang="ts">
import { ComponentTreeWidget, EmptyWidget, reactiveComputed, useTree, Viewport } from '@silver-formily/designer-vue'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import { componentRegistry } from '../componentRegistry'
import EditorEmptyState from './EditorEmptyState.vue'
import RuntimeSchemaForm from './RuntimeSchemaForm.vue'
import SchemaCodePanel from './SchemaCodePanel.vue'

const editorStore = useEditorStore()
const { viewMode } = storeToRefs(editorStore)
const treeRef = useTree()
const isEmpty = reactiveComputed(() => !treeRef.value?.children.length)
</script>

<template>
  <Viewport
    v-if="isEmpty"
    :show-aux-tool="false"
  >
    <EmptyWidget v-slot="{ isDragOver }">
      <EditorEmptyState :is-drag-over="isDragOver" />
    </EmptyWidget>
  </Viewport>

  <div
    v-else-if="viewMode === 'preview'"
    class="epd-preview-viewport"
  >
    <div class="epd-preview-component-tree">
      <RuntimeSchemaForm class="epd-preview-form" />
    </div>
  </div>

  <Viewport v-else-if="viewMode === 'editor'">
    <ComponentTreeWidget :components="componentRegistry" />
  </Viewport>

  <SchemaCodePanel v-else-if="viewMode === 'code'" />
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-preview {
  &-viewport {
    @apply absolute inset-0 mx-auto flex w-full flex-col items-center overflow-y-auto px-16 transition-all duration-300;
  }

  &-component-tree {
    @apply relative mx-auto my-8 w-full rounded-lg bg-white p-10 text-slate-900 transition-all duration-150;

    box-shadow: 0 0 20px 0 rgb(0 0 0 / 8%);
    max-width: calc(432px + 5rem);
  }

  &-form {
    display: block;
    width: 100%;
  }
}
</style>
