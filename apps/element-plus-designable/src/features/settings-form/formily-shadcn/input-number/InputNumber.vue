<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

defineOptions({
  name: 'FormilyShadcnInputNumber',
  inheritAttrs: false,
})
</script>

<template>
  <NumberField v-bind="$attrs">
    <NumberFieldContent>
      <NumberFieldInput class="pr-16" data-slot="input" />
      <NumberFieldDecrement />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
