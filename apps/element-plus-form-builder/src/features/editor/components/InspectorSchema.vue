<script setup lang="ts">
import { FileJson } from '@lucide/vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { computed } from 'vue'

import { ScrollArea } from '@/components/ui/scroll-area'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'

useObserver()

const { prefixCls, b } = createNamespace('inspector-schema')
const { serializeTree } = useEditorDesigner()
const schemaPreview = computed(() => JSON.stringify(serializeTree(), null, 2))
</script>

<template>
  <ScrollArea :class="prefixCls">
    <pre :class="b('code')">{{ schemaPreview }}</pre>
  </ScrollArea>
  <div :class="b('hint')">
    <FileJson :class="b('hint-icon')" />
    Live schema from designer-core
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-inspector-schema {
  @apply h-[calc(100vh-12rem)] min-h-96 rounded-md border bg-muted/35;

  &__code {
    @apply overflow-x-auto p-4 text-xs leading-5 text-foreground;
  }

  &__hint {
    @apply mt-3 flex items-center gap-2 text-xs text-muted-foreground;
  }

  &__hint-icon {
    @apply size-4;
  }
}
</style>
