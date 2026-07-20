<script setup lang="ts">
import { Redo, Undo } from '@lucide/vue'
import { reactiveComputed, useWorkspace } from '@silver-formily/designer-vue'
import { autorun } from '@silver-formily/reactive'
import { onBeforeUnmount, ref, watch } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createNamespace } from '@/lib/utils'
import { editorWorkspaceId } from '../designer'

const workspaceRef = useWorkspace(editorWorkspaceId)
const historyRef = reactiveComputed(() => workspaceRef.value?.history)
const { prefixCls } = createNamespace('top-right-tools-container')
const { b: toolB } = createNamespace('tool')
const { b: toolItemB } = createNamespace('tool-item')
const { b: toolTooltipB } = createNamespace('tool-tooltip')
const { b: iconB } = createNamespace('icon')
const canUndo = ref(false)
const canRedo = ref(false)
let disposeHistoryAutorun: (() => void) | undefined

function bindHistoryState() {
  disposeHistoryAutorun?.()
  disposeHistoryAutorun = undefined

  const history = historyRef.value
  if (!history) {
    canUndo.value = false
    canRedo.value = false
    return
  }

  disposeHistoryAutorun = autorun(() => {
    canUndo.value = history.allowUndo
    canRedo.value = history.allowRedo
  })
}

watch(historyRef, bindHistoryState, { immediate: true })

onBeforeUnmount(() => {
  disposeHistoryAutorun?.()
})
</script>

<template>
  <div :class="prefixCls">
    <TooltipProvider>
      <div :class="toolB({ history: true })">
        <Tooltip>
          <TooltipTrigger as-child>
            <button
              type="button"
              :class="toolItemB({
                first: true,
                hoverable: canUndo,
                disabled: !canUndo,
              })"
              aria-label="Undo"
              :disabled="!canUndo"
              @click="historyRef?.undo()"
            >
              <Undo
                :class="iconB({ md: true })"
                aria-hidden="true"
                :size="16"
                :stroke-width="2"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent
            :class="toolTooltipB({ left: true })"
            side="left"
            :side-offset="6"
          >
            Undo
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <button
              type="button"
              :class="toolItemB({
                last: true,
                hoverable: canRedo,
                disabled: !canRedo,
              })"
              aria-label="Redo"
              :disabled="!canRedo"
              @click="historyRef?.redo()"
            >
              <Redo
                :class="iconB({ md: true })"
                aria-hidden="true"
                :size="16"
                :stroke-width="2"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent
            :class="toolTooltipB({ left: true })"
            side="left"
            :side-offset="6"
          >
            Redo
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-top-right-tools-container {
  @apply absolute -left-4 top-4 z-50 flex -translate-x-full flex-col;
}

.epd-tool {
  @apply relative flex flex-col rounded border border-solid border-slate-300 bg-white text-slate-700 shadow-lg;
}

.epd-tool-item {
  @apply relative flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-xs text-inherit transition-colors;

  &--first {
    @apply rounded-t;
  }

  &--last {
    @apply rounded-b;
  }

  &--disabled {
    @apply cursor-not-allowed text-slate-300;
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
