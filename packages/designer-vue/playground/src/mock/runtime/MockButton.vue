<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Button',
})
</script>

<template>
  <button class="pd-mock-button" type="button">
    {{ label }}
  </button>
</template>
