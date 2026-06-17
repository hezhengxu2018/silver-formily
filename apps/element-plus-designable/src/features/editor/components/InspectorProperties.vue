<script setup lang="ts">
import { Settings2 } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <ScrollArea class="h-[calc(100vh-12rem)] min-h-96 pr-3">
    <div class="grid gap-4 py-2">
      <section class="grid gap-3">
        <div class="flex items-center gap-2">
          <Settings2 class="size-4 text-primary" />
          <h3 class="text-sm font-semibold">
            Selected field
          </h3>
        </div>
        <label class="grid gap-2 text-xs font-medium text-muted-foreground">
          Label
          <Input model-value="Full name" readonly />
        </label>
        <label class="grid gap-2 text-xs font-medium text-muted-foreground">
          Placeholder
          <Input model-value="Please enter full name" readonly />
        </label>
        <label class="grid gap-2 text-xs font-medium text-muted-foreground">
          Help text
          <Textarea model-value="Shown as static content for the visual pass." readonly />
        </label>
      </section>

      <Separator />

      <section class="grid gap-3">
        <h3 class="text-sm font-semibold">
          Display
        </h3>
        <div class="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button">
            Label left
          </Button>
          <Button variant="secondary" type="button">
            Full width
          </Button>
        </div>
      </section>
    </div>
  </ScrollArea>
</template>
