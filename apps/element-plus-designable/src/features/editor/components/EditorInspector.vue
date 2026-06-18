<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import InspectorProperties from './InspectorProperties.vue'
import InspectorSchema from './InspectorSchema.vue'
import InspectorStructure from './InspectorStructure.vue'

defineProps<{
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const { prefixCls, b } = createNamespace('editor-inspector')
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
          :aria-label="expanded ? '收起右侧面板' : '展开右侧面板'"
          :aria-pressed="expanded"
          @click="emit('toggle')"
        >
          <ChevronRight
            v-if="expanded"
            :class="b('toggle-icon')"
          />
          <ChevronLeft
            v-else
            :class="b('toggle-icon')"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        {{ expanded ? '收起面板' : '展开面板' }}
      </TooltipContent>
    </Tooltip>

    <div :class="b('shell')">
      <div :class="b('header')">
        <div :class="b('heading')">
          <div>
            <p :class="b('eyebrow')">
              Inspector
            </p>
            <h2 :class="b('title')">
              Node Details
            </h2>
            <p :class="b('description')">
              静态节点信息面板，后续承接选中组件属性与 schema 编辑
            </p>
          </div>
        </div>
      </div>

      <Tabs default-value="properties" :class="b('tabs')">
        <TabsList :class="b('tabs-list')">
          <TabsTrigger value="properties">
            Properties
          </TabsTrigger>
          <TabsTrigger value="structure">
            Structure
          </TabsTrigger>
          <TabsTrigger value="schema">
            Schema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" :class="b('tabs-content')">
          <InspectorProperties />
        </TabsContent>

        <TabsContent value="structure" :class="b('tabs-content')">
          <InspectorStructure />
        </TabsContent>

        <TabsContent value="schema" :class="b('tabs-content')">
          <InspectorSchema />
        </TabsContent>
      </Tabs>
    </div>
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-inspector {
  @apply fixed bottom-0 right-0 z-30 overflow-visible border-l transition-transform duration-500 ease-out;
  top: var(--editor-header-height);
  width: var(--editor-right-panel-width);
  color: var(--editor-sidebar-foreground);
  background: var(--editor-sidebar);
  border-color: var(--editor-sidebar-divider);
  box-shadow: var(--editor-sidebar-shadow);
  transform: translateX(0);

  &--collapsed {
    transform: translateX(calc(100% - var(--editor-right-panel-peek)));
  }

  &__toggle {
    @apply absolute left-0 top-4 z-60 flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all;
    transform: translateX(-50%);
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
    @apply absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-l-[1.25rem];
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

  &__tabs {
    @apply flex min-h-0 flex-1 flex-col p-3;
  }

  &__tabs-list {
    @apply grid w-full grid-cols-3;
  }

  &__tabs-content {
    @apply min-h-0 flex-1;
  }
}
</style>
