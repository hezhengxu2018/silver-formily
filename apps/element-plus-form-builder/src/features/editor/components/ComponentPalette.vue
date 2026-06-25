<script setup lang="ts">
import { ChevronLeft, ChevronRight, Search } from '@lucide/vue'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'
import ComponentPaletteItem from './ComponentPaletteItem.vue'

defineProps<{
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const { prefixCls, b } = createNamespace('component-palette')
const { paletteResourceGroups } = useEditorDesigner()
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
              v-for="group in paletteResourceGroups"
              :key="group.name"
              :class="b('group')"
            >
              <div :class="b('group-header')">
                <h3 :class="b('group-title')">
                  {{ group.name }}
                </h3>
              </div>

              <div :class="b('items')">
                <ComponentPaletteItem
                  v-for="item in group.items"
                  :key="item.sourceId"
                  :item="item"
                  :item-class="b('item')"
                  :icon-class="b('item-icon')"
                  :icon-svg-class="b('item-icon-svg')"
                  :copy-class="b('item-copy')"
                  :name-class="b('item-name')"
                />
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
    @apply absolute inset-0 overflow-hidden bg-white flex flex-col;
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
    @apply flex-1 overflow-hidden;
  }

  &__scroll {
    @apply h-full;
  }

  &__content {
    @apply px-5 pb-6;
  }

  &__group {
    @apply mt-3;
  }

  &__group-header {
    @apply flex items-center;
  }

  &__group-title {
    @apply text-[11px] font-semibold tracking-normal text-gray-500;
  }

  &__items {
    @apply mt-4 grid grid-cols-3 gap-x-3 gap-y-5;
  }

  :deep(.epd-component-palette__item) {
    @apply relative flex min-w-0 cursor-pointer flex-col items-center text-center;
    background: #fff;
    color: #000;
    line-height: 1;
    padding-bottom: 10px;
    transition: all 0.2s ease;

    &:hover {
      background: #2e73ff;
      color: #fff;
    }
  }

  :deep(.epd-component-palette__item-icon) {
    @apply flex shrink-0 items-center justify-center;
    padding: 10px 5px 12px;
  }

  :deep(.epd-component-palette__item-icon-svg) {
    @apply block size-[21px];
  }

  :deep(.epd-component-palette__item-icon-svg svg) {
    @apply block size-[21px];
  }

  :deep(.epd-component-palette__item-copy) {
    @apply w-full min-w-0;
  }

  :deep(.epd-component-palette__item-name) {
    @apply line-clamp-2 text-[12px] leading-normal;
  }

  :deep(.epd-component-palette__item:hover .epd-component-palette__item-icon-svg),
  :deep(.epd-component-palette__item:hover .epd-component-palette__item-name) {
    color: #fff;
  }
}
</style>
