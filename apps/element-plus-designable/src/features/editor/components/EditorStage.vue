<script setup lang="ts">
import { ComponentTreeWidget, EmptyWidget, useTree, Viewport } from '@silver-formily/designer-vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { storeToRefs } from 'pinia'
import { createNamespace } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor'
import { componentRegistry } from '../componentRegistry'
import EditorEmptyState from './EditorEmptyState.vue'
import RuntimeSchemaForm from './RuntimeSchemaForm.vue'
import SchemaCodePanel from './SchemaCodePanel.vue'

const editorStore = useEditorStore()
const { viewMode } = storeToRefs(editorStore)
const treeRef = useTree()
const isEmpty = reactiveComputed(() => !treeRef.value?.children.length)
const { b } = createNamespace('preview')
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
    :class="b('viewport')"
  >
    <div :class="b('component-tree')">
      <RuntimeSchemaForm :class="b('form')" />
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
  &__viewport {
    @apply absolute inset-0 mx-auto flex w-full flex-col items-center overflow-y-auto px-16 transition-all duration-300;
  }

  &__component-tree {
    @apply relative mx-auto my-8 py-8 px-2 w-full rounded-lg bg-white text-slate-900 transition-all duration-150;

    box-shadow: 0 0 20px 0 rgb(0 0 0 / 8%);
    max-width: calc(780px + 5rem);
  }

  &__form {
    display: block;
    width: 100%;
  }
}
</style>
