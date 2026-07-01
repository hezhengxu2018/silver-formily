<script setup lang="ts">
import type { PaletteResourceGroup } from '@/features/editor/designer'
import { Search } from '@lucide/vue'

defineProps<{
  groups: PaletteResourceGroup[]
}>()
</script>

<template>
  <aside class="epd-resource-widget">
    <div class="epd-resource-widget__top">
      <div class="epd-resource-widget__search">
        <Search class="epd-resource-widget__search-icon" />
        <input
          class="epd-resource-widget__search-input"
          placeholder="Search fields"
          readonly
        >
      </div>
    </div>

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
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-resource-widget {
  @apply relative z-10 h-full w-[var(--editor-left-panel-width)] shrink-0 select-none overflow-hidden bg-white text-gray-900;

  &__top {
    @apply px-5 pb-2 pt-4;
  }

  &__search {
    @apply relative;
  }

  &__search-icon {
    @apply pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-gray-400;
  }

  &__search-input {
    @apply w-full rounded-lg border-0 bg-gray-100 py-1.5 pl-8 pr-3 text-base shadow-none placeholder:text-gray-400 focus-visible:ring-0;
  }

  &__content {
    @apply h-[calc(100%-4.5rem)] overflow-y-auto px-5 pb-6;
  }

  &__group {
    @apply mt-4;
  }

  &__group-title {
    @apply text-[11px] font-semibold tracking-normal text-gray-500;
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
      @apply block size-[22px];
    }
  }

  &__item-name {
    @apply line-clamp-2 w-full min-w-0 text-[12px] leading-normal;
  }
}
</style>
