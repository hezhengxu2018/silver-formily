<script setup lang="ts">
import type { VNode } from 'vue'
import { isVNode } from 'vue'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { cn } from '@/lib/utils'

defineOptions({
  name: 'FormilyShadcnFormItem',
})

defineProps<{
  asterisk?: boolean
  controlId?: string
  description?: string | VNode
  feedbackStatus?: 'error' | 'success' | 'warning' | 'pending'
  feedbackText?: string
  label?: string | VNode
  required?: boolean
}>()
</script>

<template>
  <Field
    :class="cn(
      'grid gap-2',
      feedbackStatus === 'error' && '[&_[data-slot=input]]:border-destructive [&_[data-slot=input]]:ring-destructive/20',
    )"
    :data-invalid="feedbackStatus === 'error' ? '' : undefined"
  >
    <FieldContent>
      <FieldLabel
        v-if="label"
        :for="controlId"
      >
        <template v-if="isVNode(label)">
          <component :is="label" />
        </template>
        <template v-else>
          {{ label }}
        </template>
        <span
          v-if="asterisk ?? required"
          aria-hidden="true"
          class="text-destructive"
        >*</span>
      </FieldLabel>

      <FieldDescription
        v-if="description"
      >
        <template v-if="isVNode(description)">
          <component :is="description" />
        </template>
        <template v-else>
          {{ description }}
        </template>
      </FieldDescription>

      <FieldError
        v-if="feedbackText"
        :class="feedbackStatus !== 'error' && 'text-muted-foreground'"
      >
        {{ feedbackText }}
      </FieldError>
    </FieldContent>

    <slot />
  </Field>
</template>
