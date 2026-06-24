<script setup lang="ts">
import { Settings2 } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { createNamespace } from '@/lib/utils'

const { prefixCls, b } = createNamespace('inspector-properties')
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
          <Input model-value="Full name" readonly :class="b('field-control')" />
        </label>
        <label :class="b('field')">
          Placeholder
          <Input model-value="Please enter full name" readonly :class="b('field-control')" />
        </label>
        <label :class="b('field')">
          Help text
          <Textarea
            model-value="Shown as static content for the visual pass."
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
            Label left
          </Button>
          <Button variant="secondary" type="button" :class="b('action')">
            Full width
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
