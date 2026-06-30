<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Form',
})
</script>

<template>
  <form class="pd-mock-form" @submit.prevent>
    <header class="pd-mock-form__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="pd-mock-form__body">
      <slot />
    </div>
  </form>
</template>
