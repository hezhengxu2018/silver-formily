<script setup lang="ts">
import { PanelRightClose, PanelRightOpen } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()
const { isRightSidebarCollapsed } = storeToRefs(editorStore)
const { toggleRightSidebar } = editorStore
const { prefixCls } = createNamespace('bottom-right-tools-container')
const { b: toolB } = createNamespace('tool')
const { b: toolItemB } = createNamespace('tool-item')
const { b: toolTooltipB } = createNamespace('tool-tooltip')
const { b: iconB } = createNamespace('icon')

const panelTool = computed(() => ({
  label: isRightSidebarCollapsed.value ? 'Open panel' : 'Close panel',
  icon: isRightSidebarCollapsed.value ? PanelRightOpen : PanelRightClose,
}))
</script>

<template>
  <div :class="prefixCls">
    <TooltipProvider>
      <Tooltip>
        <div :class="toolB()">
          <TooltipTrigger as-child>
            <button
              type="button"
              :class="toolItemB({ single: true, hoverable: true })"
              :aria-label="panelTool.label"
              @click="toggleRightSidebar"
            >
              <component
                :is="panelTool.icon"
                :class="iconB({ md: true })"
                aria-hidden="true"
                :size="16"
                :stroke-width="2"
              />
            </button>
          </TooltipTrigger>
        </div>
        <TooltipContent
          :class="toolTooltipB({ left: true })"
          side="left"
          :side-offset="6"
        >
          {{ panelTool.label }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-bottom-right-tools-container {
  @apply absolute -left-4 bottom-4 z-50 flex -translate-x-full flex-col gap-2;
}

.epd-tool {
  @apply relative flex flex-col rounded border border-solid border-slate-300 bg-white text-slate-700 shadow-lg;
}

.epd-tool-item {
  @apply relative flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-xs text-inherit transition-colors;

  &--single {
    @apply rounded;
  }

  &--hoverable {
    @apply hover:bg-slate-100;
  }
}

.epd-tool-tooltip {
  @apply z-50 whitespace-nowrap rounded bg-black/80 px-1.5 py-0 text-xs text-white shadow-none;
}

.epd-icon {
  @apply inline-block overflow-visible align-[-0.125em] text-inherit;

  path {
    pointer-events: none;
  }

  &--md {
    @apply h-[1em];
  }
}
</style>
