<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen, Trash2 } from '@lucide/vue'
import { reactiveComputed, useWorkspace } from '@silver-formily/designer-vue'
import { autorun } from '@silver-formily/reactive'
import { storeToRefs } from 'pinia'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor'
import { useEditorSchemaStore } from '@/stores/editorSchema'
import { editorWorkspaceId } from '../designer'

type LeftToolAction = 'close-panel' | 'clear-form'

const editorStore = useEditorStore()
const editorSchemaStore = useEditorSchemaStore()
const workspaceRef = useWorkspace(editorWorkspaceId)
const historyRef = reactiveComputed(() => workspaceRef.value?.history)
const { isLeftSidebarCollapsed } = storeToRefs(editorStore)
const { toggleLeftSidebar } = editorStore
const { clearSchemaDocument } = editorSchemaStore
const { prefixCls } = createNamespace('bottom-left-tools-container')
const { b: toolB } = createNamespace('tool')
const { b: toolItemB } = createNamespace('tool-item')
const { b: toolTooltipB } = createNamespace('tool-tooltip')
const { b: iconB } = createNamespace('icon')
const hasHistoryRecords = ref(false)
let disposeHistoryAutorun: (() => void) | undefined

function bindHistoryState() {
  disposeHistoryAutorun?.()
  disposeHistoryAutorun = undefined

  const history = historyRef.value
  if (!history) {
    hasHistoryRecords.value = false
    return
  }

  disposeHistoryAutorun = autorun(() => {
    hasHistoryRecords.value = history.history.length > 1
  })
}

watch(historyRef, bindHistoryState, { immediate: true })

onBeforeUnmount(() => {
  disposeHistoryAutorun?.()
})

const tools = computed<Array<{
  value: LeftToolAction
  label: string
  icon: typeof PanelLeftClose
}>>(() => [
  {
    value: 'close-panel',
    label: isLeftSidebarCollapsed.value ? 'Open panel' : 'Close panel',
    icon: isLeftSidebarCollapsed.value ? PanelLeftOpen : PanelLeftClose,
  },
  { value: 'clear-form', label: 'Clear form', icon: Trash2 },
])

function handleToolClick(action: LeftToolAction) {
  if (action === 'close-panel')
    toggleLeftSidebar()
}

function handleClearForm() {
  clearSchemaDocument()
  historyRef.value?.clear()
}
</script>

<template>
  <div :class="prefixCls">
    <TooltipProvider>
      <Tooltip
        v-for="tool in tools"
        :key="tool.value"
      >
        <div
          :class="toolB({ placeholder: tool.value === 'clear-form' && !hasHistoryRecords })"
        >
          <TooltipTrigger
            v-if="tool.value === 'clear-form' && !hasHistoryRecords"
            as-child
          >
            <button
              type="button"
              :class="toolItemB({ single: true, placeholder: true })"
              aria-hidden="true"
              disabled
              tabindex="-1"
            >
              <component
                :is="tool.icon"
                :class="iconB({ md: true })"
                aria-hidden="true"
                :size="16"
                :stroke-width="2"
              />
            </button>
          </TooltipTrigger>

          <AlertDialog v-else-if="tool.value === 'clear-form'">
            <TooltipTrigger as-child>
              <AlertDialogTrigger as-child>
                <button
                  type="button"
                  :class="toolItemB({ single: true, hoverable: true })"
                  :aria-label="tool.label"
                >
                  <component
                    :is="tool.icon"
                    :class="iconB({ md: true })"
                    aria-hidden="true"
                    :size="16"
                    :stroke-width="2"
                  />
                </button>
              </AlertDialogTrigger>
            </TooltipTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear form?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all elements from the current form. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="handleClearForm">
                  Clear form
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TooltipTrigger
            v-else
            as-child
          >
            <button
              type="button"
              :class="toolItemB({ single: true, hoverable: true })"
              :aria-label="tool.label"
              @click="handleToolClick(tool.value)"
            >
              <component
                :is="tool.icon"
                :class="iconB({ md: true })"
                aria-hidden="true"
                :size="16"
                :stroke-width="2"
              />
            </button>
          </TooltipTrigger>
        </div>
        <TooltipContent
          :class="toolTooltipB({ right: true })"
          side="right"
          :side-offset="6"
        >
          {{ tool.label }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-bottom-left-tools-container {
  @apply absolute -right-4 bottom-4 z-50 flex translate-x-full flex-col gap-2;
}

.epd-tool {
  @apply relative flex flex-col rounded border border-solid border-slate-300 bg-white text-slate-700 shadow-lg;

  &--placeholder {
    @apply invisible pointer-events-none;
  }
}

.epd-tool-item {
  @apply relative flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-xs text-inherit transition-colors;

  &--first {
    @apply rounded-t;
  }

  &--last {
    @apply rounded-b;
  }

  &--single {
    @apply rounded;
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
