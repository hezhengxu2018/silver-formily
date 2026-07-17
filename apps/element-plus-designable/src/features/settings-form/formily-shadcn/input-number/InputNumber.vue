<script setup lang="ts">
import { computed, useAttrs } from 'vue'
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

const attrs = useAttrs()

const numberFieldAttrsRef = computed(() => {
  const { id: _id, ...numberFieldAttrs } = attrs
  return numberFieldAttrs
})

const inputIdRef = computed(() => typeof attrs.id === 'string' ? attrs.id : undefined)
</script>

<template>
  <NumberField v-bind="numberFieldAttrsRef">
    <NumberFieldContent>
      <NumberFieldInput :id="inputIdRef" class="pr-16" data-slot="input" />
      <NumberFieldDecrement />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
