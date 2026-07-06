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
  @apply bg-white text-gray-900;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: var(--editor-left-panel-width);
  z-index: 10;

  &__tabs {
    align-items: center;
    display: flex;
    font-size: 15px;
  }

  &__tab {
    @apply border-slate-200 bg-slate-100;

    border-bottom-width: 1px;
    border-right-width: 1px;
    cursor: pointer;
    flex: 1 1 0%;
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: center;

    &:last-child {
      border-right-width: 0;
    }

    &[data-state='active'] {
      @apply bg-white border-slate-200;

      border-bottom-width: 0;
    }
  }

  &__panel {
    flex: 1 1 0%;
    min-height: 0;
    overflow: hidden;
  }

  &__scroll-area {
    height: 100%;
    min-height: 0;
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
    @apply text-gray-500;

    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
  }

  &__items {
    @apply mt-4 gap-x-3 gap-y-3;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &__item {
    @apply bg-white text-black;

    align-items: center;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    touch-action: none;
    user-select: none;

    &:hover {
      @apply bg-blue-600 text-white;
    }

    &:active {
      cursor: grabbing;
    }
  }

  &__item-icon {
    @apply bg-gray-100 text-gray-500;

    &--svg {
      @apply bg-transparent text-current;

      align-items: center;
      display: flex;
      height: 40px;
      justify-content: center;
      width: 40px;
    }
  }

  &__item-icon--svg {
    :deep(svg) {
      display: block;
      height: 22px;
      width: 22px;
    }
  }

  &__item-name {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: 12px;
    line-clamp: 2;
    -webkit-line-clamp: 2;
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
