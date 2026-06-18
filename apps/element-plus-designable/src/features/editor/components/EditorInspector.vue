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
      <Tabs default-value="properties" :class="b('tabs')">
        <TabsList :class="b('tabs-list')">
          <TabsTrigger value="properties" :class="b('tabs-trigger')">
            Properties
          </TabsTrigger>
          <TabsTrigger value="structure" :class="b('tabs-trigger')">
            Structure
          </TabsTrigger>
          <TabsTrigger value="schema" :class="b('tabs-trigger')">
            Schema
          </TabsTrigger>
        </TabsList>

        <div :class="b('panel-wrapper')">
          <TabsContent value="properties" :class="b('tabs-content')">
            <InspectorProperties />
          </TabsContent>

          <TabsContent value="structure" :class="b('tabs-content')">
            <InspectorStructure />
          </TabsContent>

          <TabsContent value="schema" :class="b('tabs-content')">
            <InspectorSchema />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-editor-inspector {
  @apply relative z-10 shrink-0 grow-0 overflow-visible transition-all duration-500 ease-out;
  width: var(--editor-right-panel-width);
  color: rgb(31 41 55);
  background: rgb(255 255 255);

  &--collapsed {
    margin-right: calc(var(--editor-right-panel-width) * -1);
  }

  &__toggle {
    @apply absolute left-0 top-4 z-20 flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all;
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
    @apply absolute inset-0 overflow-hidden bg-white;
  }

  &__tabs {
    @apply relative h-full;
  }

  &__tabs-list {
    @apply flex w-full items-center rounded-none bg-transparent p-0 text-[13px];
  }

  &__tabs-trigger {
    @apply h-auto flex-1 rounded-none border-b border-r border-transparent bg-slate-100 px-2 py-2.5 text-center font-medium text-slate-500 shadow-none transition-colors;
    border-bottom-color: rgb(226 232 240);
    border-right-color: rgb(226 232 240);
  }

  &__tabs-trigger:last-child {
    border-right-color: transparent;
  }

  &__tabs-trigger[data-state='active'] {
    @apply bg-white text-slate-900 shadow-none;
    border-bottom-color: rgb(255 255 255);
  }

  &__panel-wrapper {
    @apply absolute inset-x-0 bottom-0 top-[2.75rem] overflow-y-auto overflow-x-hidden;
  }

  &__tabs-content {
    @apply px-5 pb-6 pt-0;
  }
}
</style>
