<script setup lang="ts">
import { ChevronLeft, ChevronRight, GripVertical, Search } from '@lucide/vue'
import { computed } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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
</script>

<template>
  <aside
    class="component-palette"
    :class="{
      'component-palette--collapsed': !expanded,
    }"
  >
    <Tooltip>
      <TooltipTrigger as-child>
        <button
          type="button"
          class="component-palette__toggle"
          :aria-label="expanded ? '收起左侧面板' : '展开左侧面板'"
          :aria-pressed="expanded"
          @click="emit('toggle')"
        >
          <ChevronLeft
            v-if="expanded"
            class="component-palette__toggle-icon"
          />
          <ChevronRight
            v-else
            class="component-palette__toggle-icon"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {{ expanded ? '收起面板' : '展开面板' }}
      </TooltipContent>
    </Tooltip>

    <div class="component-palette__shell">
      <div class="component-palette__header">
        <div class="component-palette__heading">
          <div>
            <p class="component-palette__eyebrow">
              Builder
            </p>
            <h2 class="component-palette__title">
              Components
            </h2>
            <p class="component-palette__description">
              {{ `${materialCount} 个静态物料占位，布局对齐 Vueform Builder` }}
            </p>
          </div>
          <Badge
            variant="outline"
            class="component-palette__count"
          >
            {{ materialCount }}
          </Badge>
        </div>

        <div class="component-palette__search">
          <Search class="component-palette__search-icon" />
          <Input
            model-value="Search fields"
            readonly
            class="component-palette__search-input"
          />
        </div>
      </div>

      <div class="component-palette__body">
        <ScrollArea class="component-palette__scroll">
          <div class="component-palette__content">
            <section
              v-for="group in materialGroups"
              :key="group.name"
              class="component-palette__group"
            >
              <div class="component-palette__group-header">
                <h3 class="component-palette__group-title">
                  {{ group.name }}
                </h3>
                <Badge
                  variant="outline"
                  class="component-palette__group-count"
                >
                  {{ group.items.length }}
                </Badge>
              </div>

              <div class="component-palette__items">
                <article
                  v-for="item in group.items"
                  :key="item.name"
                  class="component-palette__item"
                >
                  <div class="component-palette__item-icon">
                    <component :is="item.icon" class="component-palette__item-icon-svg" />
                  </div>
                  <div class="component-palette__item-copy">
                    <p class="component-palette__item-name">
                      {{ item.name }}
                    </p>
                    <p class="component-palette__item-description">
                      {{ item.description }}
                    </p>
                  </div>

                  <div class="component-palette__item-actions">
                    <GripVertical class="component-palette__item-action-icon" />
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

.component-palette {
  @apply fixed bottom-0 left-0 z-30 overflow-visible border-r transition-transform duration-500 ease-out;
  top: var(--editor-header-height);
  width: var(--editor-left-panel-width);
  color: var(--editor-sidebar-foreground);
  background: var(--editor-sidebar);
  border-color: var(--editor-sidebar-divider);
  box-shadow: var(--editor-sidebar-shadow);
  transform: translateX(0);
}

.component-palette--collapsed {
  transform: translateX(calc(-100% + var(--editor-left-panel-peek)));
}

.component-palette__toggle {
  @apply absolute right-0 top-4 z-60 flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all;
  transform: translateX(50%);
  color: var(--editor-sidebar-muted);
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(255, 255, 255, 0.7);
}

.component-palette__toggle:hover {
  @apply -translate-y-0.5 shadow-xl;
  color: var(--editor-sidebar-foreground);
}

.component-palette__toggle-icon {
  @apply size-4;
}

.component-palette__shell {
  @apply absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-r-[1.25rem];
  background: var(--editor-sidebar);
}

.component-palette__header {
  @apply border-b px-5 pb-4 pt-4;
  border-color: var(--editor-sidebar-divider);
}

.component-palette__heading {
  @apply flex items-start justify-between gap-3;
}

.component-palette__eyebrow {
  @apply text-xs font-semibold uppercase tracking-[0.18em];
  color: var(--editor-sidebar-muted);
}

.component-palette__title {
  @apply mt-1 text-base font-semibold;
}

.component-palette__description {
  @apply mt-1 text-xs;
  color: var(--editor-sidebar-muted);
}

.component-palette__count,
.component-palette__group-count {
  @apply border bg-white/80;
  color: var(--editor-sidebar-muted);
  border-color: var(--editor-sidebar-divider);
}

.component-palette__search {
  @apply relative mt-4;
}

.component-palette__search-icon {
  @apply pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2;
  color: var(--editor-sidebar-muted);
}

.component-palette__search-input {
  @apply h-10 rounded-xl border-0 pl-9 pr-3 text-sm shadow-none focus-visible:ring-0;
  background: var(--editor-sidebar-search);
}

.component-palette__search-input::placeholder {
  color: var(--editor-sidebar-muted);
}

.component-palette__body {
  @apply relative min-h-0 flex-1;
}

.component-palette__scroll {
  @apply h-full;
}

.component-palette__content {
  @apply grid gap-4 px-5 pb-6 pt-4;
}

.component-palette__group {
  @apply grid gap-2.5;
}

.component-palette__group-header {
  @apply flex items-center justify-between gap-2;
}

.component-palette__group-title {
  @apply text-[11px] font-semibold uppercase tracking-[0.18em];
  color: var(--editor-sidebar-muted);
}

.component-palette__items {
  @apply grid gap-1.5;
}

.component-palette__item {
  @apply relative mx-[-0.625rem] flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2.5 transition-all duration-300;
}

.component-palette__item:hover {
  background: color-mix(in oklab, var(--primary) 3%, transparent);
  border-color: color-mix(in oklab, var(--primary) 15%, transparent);
  box-shadow: var(--editor-sidebar-item-shadow);
}

.component-palette__item-icon {
  @apply flex size-8 shrink-0 items-center justify-center rounded-lg;
  color: var(--editor-sidebar-icon-fg);
  background: var(--editor-sidebar-icon-bg);
}

.component-palette__item-icon-svg {
  @apply size-4;
}

.component-palette__item-copy {
  @apply min-w-0 flex-1;
}

.component-palette__item-name {
  @apply truncate text-sm font-semibold;
  color: var(--editor-sidebar-foreground);
}

.component-palette__item-description {
  @apply truncate text-xs;
  color: var(--editor-sidebar-muted);
}

.component-palette__item-actions {
  @apply pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-2.5 py-2 opacity-0 shadow-sm transition-opacity duration-300;
  color: var(--editor-sidebar-muted);
}

.component-palette__item:hover .component-palette__item-actions {
  @apply opacity-100;
}

.component-palette__item-action-icon {
  @apply size-4;
}
</style>
