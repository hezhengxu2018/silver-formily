<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Section',
})
</script>

<template>
  <section class="pd-mock-section">
    <h2>{{ title }}</h2>
    <div class="pd-mock-section__body">
      <slot />
    </div>
  </section>
</template>
