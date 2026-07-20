<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Form',
})
</script>

<template>
  <form class="pd-playground-form" @submit.prevent>
    <div class="pd-playground-form__body">
      <slot />
    </div>
  </form>
</template>
