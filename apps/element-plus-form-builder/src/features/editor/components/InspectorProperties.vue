<script setup lang="ts">
import { Settings2 } from '@lucide/vue'
import { useObserver } from '@silver-formily/reactive-vue'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { createNamespace } from '@/lib/utils'
import { useEditorDesigner } from '../designer/useEditorDesigner'

useObserver()

const { prefixCls, b } = createNamespace('inspector-properties')
const { getNodeDisplayTitle, getNodePlaceholder, getSelectedNode } = useEditorDesigner()

const selectedNode = computed(() => getSelectedNode())
const selectedTitle = computed(() => {
  if (!selectedNode.value)
    return 'No selection'
  return getNodeDisplayTitle(selectedNode.value)
})
const selectedPlaceholder = computed(() => {
  if (!selectedNode.value)
    return ''
  return getNodePlaceholder(selectedNode.value)
})
const selectedHelpText = computed(() => {
  if (!selectedNode.value)
    return 'Select a field or container from the canvas.'
  if (selectedNode.value.componentName === 'Form')
    return 'Root form container accepts dropped materials.'
  return selectedNode.value.designerProps?.droppable
    ? 'Container component that can host child nodes.'
    : 'Field preview is currently read-only in the baseline integration.'
})
</script>

<template>
  <ScrollArea :class="prefixCls">
    <div :class="b('content')">
      <section :class="b('section')">
        <div :class="b('section-header')">
          <Settings2 :class="b('section-icon')" />
          <h3 :class="b('section-title')">
            Selected field
          </h3>
        </div>
        <label :class="b('field')">
          Label
          <Input :model-value="selectedTitle" readonly :class="b('field-control')" />
        </label>
        <label :class="b('field')">
          Placeholder
          <Input :model-value="selectedPlaceholder" readonly :class="b('field-control')" />
        </label>
        <label :class="b('field')">
          Help text
          <Textarea
            :model-value="selectedHelpText"
            readonly
            :class="b('field-control')"
          />
        </label>
      </section>

      <Separator :class="b('separator')" />

      <section :class="b('section')">
        <h3 :class="b('section-title')">
          Display
        </h3>
        <div :class="b('actions')">
          <Button variant="outline" type="button" :class="b('action')">
            {{ selectedNode?.designerProps?.droppable ? 'Can contain children' : 'Field preview' }}
          </Button>
          <Button variant="secondary" type="button" :class="b('action')">
            {{ selectedNode?.componentName ?? 'No node' }}
          </Button>
        </div>
      </section>
    </div>
  </ScrollArea>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-inspector-properties {
  @apply h-[calc(100vh-12rem)] min-h-96 pr-3;

  &__content {
    @apply grid gap-4 py-2;
  }

  &__section {
    @apply grid gap-3;
  }

  &__section-header {
    @apply flex items-center gap-2;
  }

  &__section-icon {
    @apply size-4 text-primary;
  }

  &__section-title {
    @apply text-sm font-semibold;
  }

  &__field {
    @apply grid gap-2 text-xs font-medium text-muted-foreground;
  }

  &__field-control {
    @apply text-foreground;
  }

  &__separator {
    @apply my-0;
  }

  &__actions {
    @apply grid grid-cols-2 gap-2;
  }

  &__action {
    @apply w-full;
  }
}
</style>
