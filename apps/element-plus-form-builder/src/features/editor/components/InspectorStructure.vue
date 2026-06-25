<script setup lang="ts">
import { ChevronRight, GripVertical } from '@lucide/vue'
import { useObserver } from '@silver-formily/reactive-vue'

import { ScrollArea } from '@/components/ui/scroll-area'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'

useObserver()

const { prefixCls, b } = createNamespace('inspector-structure')
const { flattenTree } = useEditorDesigner()
</script>

<template>
  <ScrollArea :class="prefixCls">
    <ol :class="b('list')">
      <li
        v-for="node in flattenTree()"
        :key="node.id"
        :class="b('item', { active: node.selected })"
        :style="{ paddingLeft: `${node.depth * 14 + 12}px` }"
      >
        <ChevronRight :class="b('item-icon')" />
        <div :class="b('item-copy')">
          <p :class="b('item-name')">
            {{ node.name }}
          </p>
          <p :class="b('item-type')">
            {{ node.type }}
          </p>
        </div>
        <GripVertical :class="b('item-handle')" />
      </li>
    </ol>
  </ScrollArea>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-inspector-structure {
  @apply h-[calc(100vh-12rem)] min-h-96 pr-3;

  &__list {
    @apply grid gap-2 py-2;
  }

  &__item {
    @apply flex items-center gap-3 rounded-md border bg-card px-3 py-2;

    &--active {
      @apply border-primary/35 bg-primary/5;
    }
  }

  &__item-icon,
  &__item-handle {
    @apply size-4 shrink-0 text-muted-foreground;
  }

  &__item-copy {
    @apply min-w-0 flex-1;
  }

  &__item-name {
    @apply truncate text-sm font-medium;
  }

  &__item-type {
    @apply text-xs text-muted-foreground;
  }
}
</style>
