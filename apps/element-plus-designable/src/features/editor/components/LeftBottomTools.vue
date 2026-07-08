<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen, Trash2 } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
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
import { useEditorStore } from '@/stores/editor'
import { useEditorSchemaStore } from '@/stores/editorSchema'

type LeftToolAction = 'close-panel' | 'clear-form'

const editorStore = useEditorStore()
const editorSchemaStore = useEditorSchemaStore()
const { isLeftSidebarCollapsed } = storeToRefs(editorStore)
const { schemaDocument } = storeToRefs(editorSchemaStore)
const { toggleLeftSidebar } = editorStore
const { clearSchemaDocument } = editorSchemaStore

const isFormEmpty = computed(() => {
  const properties = schemaDocument.value.schema?.properties
  return !properties || Object.keys(properties).length === 0
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
}
</script>

<template>
  <div class="epd-bottom-left-tools-container">
    <TooltipProvider>
      <Tooltip
        v-for="tool in tools"
        :key="tool.value"
      >
        <div
          class="epd-tool"
          :class="{ 'epd-tool-placeholder': tool.value === 'clear-form' && isFormEmpty }"
        >
          <TooltipTrigger
            v-if="tool.value === 'clear-form' && isFormEmpty"
            as-child
          >
            <button
              type="button"
              class="epd-tool-item epd-tool-item-single epd-tool-item-placeholder"
              aria-hidden="true"
              disabled
              tabindex="-1"
            >
              <component
                :is="tool.icon"
                class="epd-icon epd-icon-md"
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
                  class="epd-tool-item epd-tool-item-single epd-tool-item-hoverable"
                  :aria-label="tool.label"
                >
                  <component
                    :is="tool.icon"
                    class="epd-icon epd-icon-md"
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
              class="epd-tool-item epd-tool-item-single epd-tool-item-hoverable"
              :aria-label="tool.label"
              @click="handleToolClick(tool.value)"
            >
              <component
                :is="tool.icon"
                class="epd-icon epd-icon-md"
                aria-hidden="true"
                :size="16"
                :stroke-width="2"
              />
            </button>
          </TooltipTrigger>
        </div>
        <TooltipContent
          class="epd-tool-tooltip epd-tool-tooltip-right"
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

  &-placeholder {
    @apply invisible pointer-events-none;
  }
}

.epd-tool-item {
  @apply relative flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-xs text-inherit transition-colors;

  &-first {
    @apply rounded-t;
  }

  &-last {
    @apply rounded-b;
  }

  &-single {
    @apply rounded;
  }

  &-active {
    @apply bg-slate-100;

    &-primary {
      @apply bg-primary text-primary-foreground;
    }
  }

  &-disabled {
    @apply cursor-not-allowed text-slate-300;
  }

  &-passive {
    cursor: default !important;
  }

  &-hoverable {
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

  &-md {
    @apply h-[1em];
  }

  &-lg {
    @apply h-[1.2em];
  }
}
</style>
