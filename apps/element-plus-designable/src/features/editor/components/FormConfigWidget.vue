<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { createNamespace } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor'
import RightBottomTools from './RightBottomTools.vue'
import RightTopTools from './RightTopTools.vue'

const editorStore = useEditorStore()
const { isRightSidebarCollapsed } = storeToRefs(editorStore)
const { b } = createNamespace('form-config-widget')
</script>

<template>
  <aside :class="b({ collapsed: isRightSidebarCollapsed })">
    <div :class="b('clip', { collapsed: isRightSidebarCollapsed })" />
    <RightTopTools />
    <RightBottomTools />
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-form-config-widget {
  @apply relative h-full w-96 shrink-0 select-none bg-white duration-500 ease-in-out;

  transition-property: margin-right;

  &--collapsed {
    margin-right: -24rem;
  }

  &__clip {
    @apply pointer-events-auto absolute inset-y-0 right-0 w-full overflow-hidden bg-white;

    &--collapsed {
      @apply pointer-events-none;
    }
  }
}
</style>
