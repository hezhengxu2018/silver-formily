<script setup lang="ts">
import { computed, ref } from 'vue'

import { TooltipProvider } from '@/components/ui/tooltip'
import ComponentPalette from '@/features/editor/components/ComponentPalette.vue'
import EditorCanvas from '@/features/editor/components/EditorCanvas.vue'
import EditorHeader from '@/features/editor/components/EditorHeader.vue'
import EditorInspector from '@/features/editor/components/EditorInspector.vue'
import { createNamespace } from '@/lib/utils'

const isLeftPanelOpen = ref(true)
const isRightPanelOpen = ref(true)

const { prefixCls, b } = createNamespace('app-shell')

const workspaceSideOffset = computed(() =>
  isLeftPanelOpen.value || isRightPanelOpen.value
    ? 'calc(var(--editor-left-panel-width) + 1rem)'
    : 'calc(var(--editor-left-panel-peek) + 1rem)',
)
</script>

<template>
  <TooltipProvider :delay-duration="180">
    <main :class="prefixCls">
      <EditorHeader />
      <ComponentPalette
        :expanded="isLeftPanelOpen"
        @toggle="isLeftPanelOpen = !isLeftPanelOpen"
      />
      <EditorInspector
        :expanded="isRightPanelOpen"
        @toggle="isRightPanelOpen = !isRightPanelOpen"
      />

      <section
        :class="b('workspace')"
        :style="{
          '--editor-workspace-side-offset': workspaceSideOffset,
        }"
      >
        <EditorCanvas />
      </section>
    </main>
  </TooltipProvider>
</template>

<style scoped>
@reference "./styles/globals.css";

.epd-app-shell {
  @apply min-h-screen pt-[var(--editor-header-height)] text-foreground;
  background: var(--editor-canvas);

  &__workspace {
    @apply flex min-h-[calc(100vh-var(--editor-header-height))] items-center justify-center p-4 xl:p-5;
  }
}

@media (min-width: 1024px) {
  .epd-app-shell__workspace {
    padding-right: var(--editor-workspace-side-offset);
    padding-left: var(--editor-workspace-side-offset);
  }
}
</style>
