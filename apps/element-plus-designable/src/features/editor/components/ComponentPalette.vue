<script setup lang="ts">
import { ChevronLeft, ChevronRight, GripVertical, Search } from '@lucide/vue'
import { computed } from 'vue'

import { Badge } from '@/components/ui/badge'
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

const materialCount = computed(() =>
  materialGroups.reduce((total, group) => total + group.items.length, 0),
)

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
      <div :class="b('header')">
        <div :class="b('heading')">
          <div>
            <p :class="b('eyebrow')">
              Builder
            </p>
            <h2 :class="b('title')">
              Components
            </h2>
            <p :class="b('description')">
              {{ `${materialCount} 个静态物料占位，布局对齐 Vueform Builder` }}
            </p>
          </div>
          <Badge
            variant="outline"
            :class="b('count')"
          >
            {{ materialCount }}
          </Badge>
        </div>

        <div :class="b('search')">
          <Search :class="b('search-icon')" />
          <Input
            model-value="Search fields"
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
                <Badge
                  variant="outline"
                  :class="b('group-count')"
                >
                  {{ group.items.length }}
                </Badge>
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
  @apply fixed bottom-0 left-0 z-30 overflow-visible border-r transition-transform duration-500 ease-out;
  top: var(--editor-header-height);
  width: var(--editor-left-panel-width);
  color: var(--editor-sidebar-foreground);
  background: var(--editor-sidebar);
  border-color: var(--editor-sidebar-divider);
  box-shadow: var(--editor-sidebar-shadow);
  transform: translateX(0);

  &--collapsed {
    transform: translateX(calc(-100% + var(--editor-left-panel-peek)));
  }

  &__toggle {
    @apply absolute right-0 top-4 z-60 flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all;
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
    @apply absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-r-[1.25rem];
    background: var(--editor-sidebar);
  }

  &__header {
    @apply border-b px-5 pb-4 pt-4;
    border-color: var(--editor-sidebar-divider);
  }

  &__heading {
    @apply flex items-start justify-between gap-3;
  }

  &__eyebrow {
    @apply text-xs font-semibold uppercase tracking-[0.18em];
    color: var(--editor-sidebar-muted);
  }

  &__title {
    @apply mt-1 text-base font-semibold;
  }

  &__description {
    @apply mt-1 text-xs;
    color: var(--editor-sidebar-muted);
  }

  &__count,
  &__group-count {
    @apply border bg-white/80;
    color: var(--editor-sidebar-muted);
    border-color: var(--editor-sidebar-divider);
  }

  &__search {
    @apply relative mt-4;
  }

  &__search-icon {
    @apply pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2;
    color: var(--editor-sidebar-muted);
  }

  &__search-input {
    @apply h-10 rounded-xl border-0 pl-9 pr-3 text-sm shadow-none focus-visible:ring-0;
    background: var(--editor-sidebar-search);

    &::placeholder {
      color: var(--editor-sidebar-muted);
    }
  }

  &__body {
    @apply relative min-h-0 flex-1;
  }

  &__scroll {
    @apply h-full;
  }

  &__content {
    @apply grid gap-4 px-5 pb-6 pt-4;
  }

  &__group {
    @apply grid gap-2.5;
  }

  &__group-header {
    @apply flex items-center justify-between gap-2;
  }

  &__group-title {
    @apply text-[11px] font-semibold uppercase tracking-[0.18em];
    color: var(--editor-sidebar-muted);
  }

  &__items {
    @apply grid gap-1.5;
  }

  &__item {
    @apply relative -mx-2.5 flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2.5 transition-all duration-300;

    &:hover {
      background: color-mix(in oklab, var(--primary) 3%, transparent);
      border-color: color-mix(in oklab, var(--primary) 15%, transparent);
      box-shadow: var(--editor-sidebar-item-shadow);
    }
  }

  &__item-icon {
    @apply flex size-8 shrink-0 items-center justify-center rounded-lg;
    color: var(--editor-sidebar-icon-fg);
    background: var(--editor-sidebar-icon-bg);
  }

  &__item-icon-svg {
    @apply size-4;
  }

  &__item-copy {
    @apply min-w-0 flex-1;
  }

  &__item-name {
    @apply truncate text-sm font-semibold;
    color: var(--editor-sidebar-foreground);
  }

  &__item-description {
    @apply truncate text-xs;
    color: var(--editor-sidebar-muted);
  }

  &__item-actions {
    @apply pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-2.5 py-2 opacity-0 shadow-sm transition-opacity duration-300;
    color: var(--editor-sidebar-muted);
  }

  &__item:hover &__item-actions {
    @apply opacity-100;
  }

  &__item-action-icon {
    @apply size-4;
  }
}
</style>
