<script setup lang="ts">
import type { PaletteResourceGroup } from '@/features/editor/designer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

defineProps<{
  groups: PaletteResourceGroup[]
}>()
</script>

<template>
  <Tabs
    class="epd-resource-widget"
    default-value="elements"
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
                draggable="true"
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
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-resource-widget {
  @apply flex flex-col relative z-10 h-full w-(--editor-left-panel-width) shrink-0 select-none overflow-hidden bg-white text-gray-900;

  &__tabs {
    @apply flex items-center text-[0.9375rem];
  }

  &__tab {
    @apply flex-1 border-slate-200 border-r border-b cursor-pointer pt-2.5 pb-2.5 text-center bg-slate-100;

    &:last-child {
      @apply border-r-0;
    }

    &[data-state='active'] {
      @apply bg-white border-slate-200 border-b-0;
    }
  }

  &__panel {
    @apply min-h-0 flex-1 overflow-hidden;
  }

  &__scroll-area {
    @apply h-full min-h-0;
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
    @apply text-[12px] font-semibold tracking-normal text-gray-500;
  }

  &__items {
    @apply mt-4 grid grid-cols-3 gap-x-3 gap-y-5;
  }

  &__item {
    @apply relative flex min-w-0 touch-none select-none flex-col items-center bg-white pb-2 text-center text-black transition-colors;
    cursor: grab;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      @apply bg-blue-600 text-white;
    }

    &:active {
      cursor: grabbing;
    }
  }

  &__item-icon {
    @apply my-3 flex size-8 shrink-0 items-center justify-center rounded bg-gray-100 px-1 text-[10px] font-semibold text-gray-500;

    &--svg {
      @apply bg-transparent text-current;
    }
  }

  &__item-icon--svg {
    :deep(svg) {
      @apply block size-5.5;
    }
  }

  &__item-name {
    @apply line-clamp-2 w-full min-w-0 text-[12px] leading-normal;
  }
}
</style>
