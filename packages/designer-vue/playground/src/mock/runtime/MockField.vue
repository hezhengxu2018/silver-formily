<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  placeholder?: string
}>(), {
  label: 'Field',
  placeholder: '',
})
</script>

<template>
  <label class="pd-mock-field">
    <span>{{ label }}</span>
    <input :placeholder="placeholder">
  </label>
</template>
