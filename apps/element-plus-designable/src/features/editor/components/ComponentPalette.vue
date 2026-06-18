<script setup lang="ts">
import { ChevronLeft, ChevronRight, GripVertical, Search } from '@lucide/vue'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import { materialGroups } from '../mockData'

defineProps<{
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const { prefixCls, b } = createNamespace('component-palette')
</script>

<template>
  <aside
    :class="[prefixCls, b({ collapsed: !expanded })]"
  >
    <Tooltip>
      <TooltipTrigger as-child>
        <button
          type="button"
          :class="b('toggle')"
          :aria-label="expanded ? '收起左侧面板' : '展开左侧面板'"
          :aria-pressed="expanded"
          @click="emit('toggle')"
        >
          <ChevronLeft
            v-if="expanded"
            :class="b('toggle-icon')"
          />
          <ChevronRight
            v-else
            :class="b('toggle-icon')"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {{ expanded ? '收起面板' : '展开面板' }}
      </TooltipContent>
    </Tooltip>

    <div :class="b('shell')">
      <div :class="b('top')">
        <div :class="b('search')">
          <Search :class="b('search-icon')" />
          <Input
            placeholder="Search fields"
            readonly
            :class="b('search-input')"
          />
        </div>
      </div>

      <div :class="b('body')">
        <ScrollArea :class="b('scroll')">
          <div :class="b('content')">
            <section
              v-for="group in materialGroups"
              :key="group.name"
              :class="b('group')"
            >
              <div :class="b('group-header')">
                <h3 :class="b('group-title')">
                  {{ group.name }}
                </h3>
              </div>

              <div :class="b('items')">
                <article
                  v-for="item in group.items"
                  :key="item.name"
                  :class="b('item')"
                >
                  <div :class="b('item-icon')">
                    <component :is="item.icon" :class="b('item-icon-svg')" />
                  </div>
                  <div :class="b('item-copy')">
                    <p :class="b('item-name')">
                      {{ item.name }}
                    </p>
                    <p :class="b('item-description')">
                      {{ item.description }}
                    </p>
                  </div>

                  <div :class="b('item-actions')">
                    <GripVertical :class="b('item-action-icon')" />
                  </div>
                </article>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-component-palette {
  @apply relative z-10 shrink-0 grow-0 overflow-visible transition-all duration-500 ease-out;
  width: var(--editor-left-panel-width);
  color: rgb(31 41 55);
  background: rgb(255 255 255);

  &--collapsed {
    margin-left: calc(var(--editor-left-panel-width) * -1);
  }

  &__toggle {
    @apply absolute right-0 top-4 z-20 flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all;
    transform: translateX(50%);
    color: var(--editor-sidebar-muted);
    background: rgba(255, 255, 255, 0.96);
    border-color: rgba(255, 255, 255, 0.7);

    &:hover {
      @apply -translate-y-0.5 shadow-xl;
      color: var(--editor-sidebar-foreground);
    }
  }

  &__toggle-icon {
    @apply size-4;
  }

  &__shell {
    @apply absolute inset-0 overflow-hidden bg-white;
  }

  &__top {
    @apply px-5 pb-2 pt-4;
  }

  &__search {
    @apply relative mt-4;
  }

  &__search-icon {
    @apply pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-gray-400;
  }

  &__search-input {
    @apply w-full rounded-lg border-0 bg-gray-100 py-1.5 pl-8 pr-3 text-base shadow-none placeholder:text-gray-400 focus-visible:ring-0;
  }

  &__body {
    @apply absolute inset-0;
  }

  &__scroll {
    @apply absolute inset-x-0 bottom-0 top-[6.5625rem];
  }

  &__content {
    @apply px-5 pb-6;
  }

  &__group {
    @apply mt-4;
  }

  &__group-header {
    @apply flex items-center;
  }

  &__group-title {
    @apply text-xs font-semibold tracking-normal text-gray-500;
  }

  &__items {
    @apply mt-2;
  }

  &__item {
    @apply relative -mx-2.5 my-2 flex items-center rounded-lg border border-transparent px-2.5 py-2.5 shadow-none transition-shadow duration-300;

    &:hover {
      border-color: color-mix(in oklab, var(--primary) 18%, transparent);
      box-shadow: var(--editor-sidebar-item-shadow);
    }
  }

  &__item-icon {
    @apply mr-3 flex size-8 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500;
  }

  &__item-icon-svg {
    @apply size-4;
  }

  &__item-copy {
    @apply min-w-0 flex-1;
  }

  &__item-name {
    @apply truncate text-sm font-semibold leading-tight text-gray-800;
  }

  &__item-description {
    @apply truncate text-[12px] leading-snug text-gray-500;
  }

  &__item-actions {
    @apply pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center gap-4 rounded bg-white px-3 py-2 opacity-0 transition-opacity duration-300;
    color: rgb(209 213 219);
  }

  &__item:hover &__item-actions {
    @apply opacity-100;
  }

  &__item-action-icon {
    @apply size-4;
  }
}
</style>
