<script setup lang="ts">
import { ref } from 'vue'

import { TooltipProvider } from '@/components/ui/tooltip'
import ComponentPalette from '@/features/editor/components/ComponentPalette.vue'
import EditorCanvas from '@/features/editor/components/EditorCanvas.vue'
import EditorHeader from '@/features/editor/components/EditorHeader.vue'
import EditorInspector from '@/features/editor/components/EditorInspector.vue'
import { createNamespace } from '@/lib/utils'

const isLeftPanelOpen = ref(true)
const isRightPanelOpen = ref(true)

const { prefixCls, b } = createNamespace('app-shell')
</script>

<template>
  <TooltipProvider :delay-duration="180">
    <main :class="prefixCls">
      <EditorHeader />

      <section :class="b('workspace')">
        <ComponentPalette
          :expanded="isLeftPanelOpen"
          @toggle="isLeftPanelOpen = !isLeftPanelOpen"
        />
        <div :class="b('center')">
          <EditorCanvas />
        </div>
        <EditorInspector
          :expanded="isRightPanelOpen"
          @toggle="isRightPanelOpen = !isRightPanelOpen"
        />
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
    @apply relative flex min-h-[calc(100vh-var(--editor-header-height))] overflow-hidden;
  }

  &__center {
    @apply relative min-w-[30rem] flex-1;
  }
}
</style>
