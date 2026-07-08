<script setup lang="ts">
import type { PaletteResourceGroup } from '@/features/editor/designer'
import { storeToRefs } from 'pinia'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEditorStore } from '@/stores/editor'
import LeftBottomTools from './LeftBottomTools.vue'
import LeftTopTools from './LeftTopTools.vue'

defineProps<{
  groups: PaletteResourceGroup[]
}>()

const editorStore = useEditorStore()
const { isLeftSidebarCollapsed } = storeToRefs(editorStore)
</script>

<template>
  <div
    class="epd-resource-widget"
    :class="{ 'epd-resource-widget--collapsed': isLeftSidebarCollapsed }"
  >
    <div
      class="epd-resource-widget__clip"
      :class="{ 'epd-resource-widget__clip--collapsed': isLeftSidebarCollapsed }"
    >
      <Tabs
        default-value="elements"
        class="epd-resource-widget__wrapper"
      >
        <TabsList
          class="epd-resource-widget__tabs"
          aria-label="Resource panel"
        >
          <TabsTrigger
            class="epd-resource-widget__tab"
            value="elements"
          >
            Elements
          </TabsTrigger>
          <TabsTrigger
            class="epd-resource-widget__tab"
            value="tree"
          >
            Tree
          </TabsTrigger>
        </TabsList>

        <TabsContent
          class="epd-resource-widget__panel"
          value="elements"
        >
          <ScrollArea class="epd-resource-widget__scroll-area">
            <div class="epd-resource-widget__content">
              <section
                v-for="group in groups"
                :key="group.name"
                class="epd-resource-widget__group"
              >
                <h3 class="epd-resource-widget__group-title">
                  {{ group.name }}
                </h3>

                <div class="epd-resource-widget__items">
                  <article
                    v-for="item in group.items"
                    :key="item.sourceId"
                    class="epd-resource-widget__item"
                    :data-designer-source-id="item.sourceId"
                  >
                    <span
                      v-if="item.iconSvg"
                      class="epd-resource-widget__item-icon epd-resource-widget__item-icon--svg"
                      v-html="item.iconSvg"
                    />
                    <span
                      v-else
                      class="epd-resource-widget__item-icon"
                    >
                      {{ String(item.icon ?? item.title).slice(0, 2) }}
                    </span>
                    <span class="epd-resource-widget__item-name">
                      {{ item.title }}
                    </span>
                  </article>
                </div>
              </section>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          class="epd-resource-widget__panel"
          value="tree"
        >
          <ScrollArea class="epd-resource-widget__scroll-area" />
        </TabsContent>
      </Tabs>
    </div>
    <LeftTopTools />
    <LeftBottomTools />
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-resource-widget {
  @apply relative z-10 flex h-full w-(--editor-left-panel-width) shrink-0 select-none flex-col bg-white text-gray-900 duration-500 ease-in-out;

  transition-property: margin-left;

  &--collapsed {
    margin-left: calc(var(--editor-left-panel-width) * -1);
  }

  &__clip {
    @apply pointer-events-auto absolute inset-y-0 left-0 w-full overflow-hidden bg-white;

    &--collapsed {
      @apply pointer-events-none;
    }
  }

  &__wrapper {
    @apply flex h-full w-(--editor-left-panel-width) flex-col overflow-hidden;
  }

  &__tabs {
    @apply flex items-center text-[15px];
  }

  &__tab {
    @apply flex-1 cursor-pointer border-b border-r border-slate-200 bg-slate-100 py-2.5 text-center;

    &:last-child {
      @apply border-r-0;
    }

    &[data-state='active'] {
      @apply border-b-0 border-slate-200 bg-white;
    }
  }

  &__panel {
    @apply min-h-0 flex-1 overflow-hidden;
  }

  &__scroll-area {
    @apply h-full min-h-0 outline-none;
  }

  &__top {
    @apply px-5 pb-2 pt-7;
  }

  &__content {
    @apply px-5 pb-6;
  }

  &__group {
    @apply mt-4;
  }

  &__group-title {
    @apply text-xs font-semibold tracking-normal text-gray-500;
  }

  &__items {
    @apply mt-4 grid grid-cols-3 gap-x-3 gap-y-3;
  }

  &__item {
    @apply flex aspect-square touch-none select-none flex-col items-center justify-center bg-white text-black;

    &:hover {
      @apply bg-blue-600 text-white;
    }

    &:active {
      @apply cursor-grabbing;
    }
  }

  &__item-icon {
    @apply bg-gray-100 text-gray-500;

    &--svg {
      @apply flex h-10 w-10 items-center justify-center bg-transparent text-current;
    }
  }

  &__item-icon--svg {
    :deep(svg) {
      @apply block h-5.5 w-5.5;
    }
  }

  &__item-name {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: 12px;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    line-height: 16px;
    min-height: 32px;
    min-width: 0;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-align: center;
    width: 100%;
  }
}
</style>
