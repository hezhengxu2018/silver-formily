<script setup lang="ts">
import { Input } from '@/components/ui/input'

defineOptions({
  name: 'FormilyShadcnInput',
  inheritAttrs: false,
})
</script>

<template>
  <Input v-bind="$attrs" data-slot="input" />
</template>
