<script setup lang="ts">
import type { EditorViewMode } from '@/stores/editor'
import { Code2, Eye, SquarePen } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()
const { viewMode } = storeToRefs(editorStore)
const { setViewMode } = editorStore
const { prefixCls } = createNamespace('top-left-tools-container')
const { b: toolB } = createNamespace('tool')
const { b: toolItemB } = createNamespace('tool-item')
const { b: toolTooltipB } = createNamespace('tool-tooltip')
const { b: iconB } = createNamespace('icon')

const viewTools: Array<{
  value: EditorViewMode
  label: string
  icon: typeof SquarePen
}> = [
  { value: 'editor', label: 'Editor', icon: SquarePen },
  { value: 'preview', label: 'Preview', icon: Eye },
  { value: 'code', label: 'Code', icon: Code2 },
]
</script>

<template>
  <div :class="prefixCls">
    <TooltipProvider>
      <RadioGroupRoot
        v-model="viewMode"
        :class="toolB({ view: true })"
        orientation="vertical"
        aria-label="View"
      >
        <RadioGroupItem
          v-for="(tool, index) in viewTools"
          :key="tool.value"
          :class="toolItemB({
            first: index === 0,
            last: index === viewTools.length - 1,
          })"
          :value="tool.value"
          :aria-label="tool.label"
          @click="setViewMode(tool.value)"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <span :class="toolItemB('trigger')">
                <component
                  :is="tool.icon"
                  :class="iconB({ md: true })"
                  aria-hidden="true"
                  :size="16"
                  :stroke-width="2"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent
              :class="toolTooltipB({ right: true })"
              side="right"
              :side-offset="6"
            >
              {{ tool.label }}
            </TooltipContent>
          </Tooltip>
        </RadioGroupItem>
      </RadioGroupRoot>
    </TooltipProvider>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-top-left-tools-container {
  @apply absolute -right-4 top-4 z-50 flex translate-x-full flex-col;
}

.epd-tool {
  @apply relative flex flex-col rounded border border-solid border-slate-300 bg-white text-slate-700 shadow-lg;

  &--view {
    @apply mb-2;
  }
}

.epd-tool-item {
  @apply relative flex h-8 w-8 cursor-pointer items-center justify-center text-xs transition-colors;

  &[data-state='checked'] {
    @apply bg-primary text-primary-foreground;
  }

  &--first {
    @apply rounded-t;
  }

  &--last {
    @apply rounded-b;
  }

  &--active {
    @apply bg-slate-100;

    &-primary {
      @apply bg-primary text-primary-foreground;
    }
  }

  &--disabled {
    @apply cursor-not-allowed text-slate-300;
  }

  &--passive {
    cursor: default !important;
  }

  &--hoverable {
    @apply hover:bg-slate-100;
  }

  &__trigger {
    @apply flex h-full w-full items-center justify-center;
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

  &--lg {
    @apply h-[1.2em];
  }
}
</style>
