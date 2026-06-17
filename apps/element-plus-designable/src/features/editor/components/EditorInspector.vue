<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import InspectorProperties from './InspectorProperties.vue'
import InspectorSchema from './InspectorSchema.vue'
import InspectorStructure from './InspectorStructure.vue'

defineProps<{
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <aside
    class="editor-inspector"
    :class="{
      'editor-inspector--collapsed': !expanded,
    }"
  >
    <Tooltip>
      <TooltipTrigger as-child>
        <button
          type="button"
          class="editor-inspector__toggle"
          :aria-label="expanded ? '收起右侧面板' : '展开右侧面板'"
          :aria-pressed="expanded"
          @click="emit('toggle')"
        >
          <ChevronRight
            v-if="expanded"
            class="editor-inspector__toggle-icon"
          />
          <ChevronLeft
            v-else
            class="editor-inspector__toggle-icon"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        {{ expanded ? '收起面板' : '展开面板' }}
      </TooltipContent>
    </Tooltip>

    <div class="editor-inspector__shell">
      <div class="editor-inspector__header">
        <div class="editor-inspector__heading">
          <div>
            <p class="editor-inspector__eyebrow">
              Inspector
            </p>
            <h2 class="editor-inspector__title">
              Node Details
            </h2>
            <p class="editor-inspector__description">
              静态节点信息面板，后续承接选中组件属性与 schema 编辑
            </p>
          </div>
        </div>
      </div>

      <Tabs default-value="properties" class="editor-inspector__tabs">
        <TabsList class="editor-inspector__tabs-list">
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

        <TabsContent value="properties" class="editor-inspector__tabs-content">
          <InspectorProperties />
        </TabsContent>

        <TabsContent value="structure" class="editor-inspector__tabs-content">
          <InspectorStructure />
        </TabsContent>

        <TabsContent value="schema" class="editor-inspector__tabs-content">
          <InspectorSchema />
        </TabsContent>
      </Tabs>
    </div>
  </aside>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.editor-inspector {
  @apply fixed bottom-0 right-0 z-30 overflow-visible border-l transition-transform duration-500 ease-out;
  top: var(--editor-header-height);
  width: var(--editor-right-panel-width);
  color: var(--editor-sidebar-foreground);
  background: var(--editor-sidebar);
  border-color: var(--editor-sidebar-divider);
  box-shadow: var(--editor-sidebar-shadow);
  transform: translateX(0);
}

.editor-inspector--collapsed {
  transform: translateX(calc(100% - var(--editor-right-panel-peek)));
}

.editor-inspector__toggle {
  @apply absolute left-0 top-4 z-60 flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all;
  transform: translateX(-50%);
  color: var(--editor-sidebar-muted);
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(255, 255, 255, 0.7);
}

.editor-inspector__toggle:hover {
  @apply -translate-y-0.5 shadow-xl;
  color: var(--editor-sidebar-foreground);
}

.editor-inspector__toggle-icon {
  @apply size-4;
}

.editor-inspector__shell {
  @apply absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-l-[1.25rem];
  background: var(--editor-sidebar);
}

.editor-inspector__header {
  @apply border-b px-5 pb-4 pt-4;
  border-color: var(--editor-sidebar-divider);
}

.editor-inspector__heading {
  @apply flex items-start justify-between gap-3;
}

.editor-inspector__eyebrow {
  @apply text-xs font-semibold uppercase tracking-[0.18em];
  color: var(--editor-sidebar-muted);
}

.editor-inspector__title {
  @apply mt-1 text-base font-semibold;
}

.editor-inspector__description {
  @apply mt-1 text-xs;
  color: var(--editor-sidebar-muted);
}

.editor-inspector__tabs {
  @apply flex min-h-0 flex-1 flex-col p-3;
}

.editor-inspector__tabs-list {
  @apply grid w-full grid-cols-3;
}

.editor-inspector__tabs-content {
  @apply min-h-0 flex-1;
}
</style>
