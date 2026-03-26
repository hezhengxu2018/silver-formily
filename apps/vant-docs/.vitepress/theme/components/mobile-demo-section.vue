<script setup lang="ts">
defineOptions({
  name: 'MobileDemoSection',
})

defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="mobile-demo-section">
    <header class="mobile-demo-section__header">
      <h2 class="mobile-demo-section__title">
        {{ title }}
      </h2>
      <p v-if="description" class="mobile-demo-section__description">
        {{ description }}
      </p>
    </header>

    <div class="mobile-demo-section__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.mobile-demo-section {
  display: grid;
}

.mobile-demo-section + .mobile-demo-section {
  margin-top: 8px;
}

.mobile-demo-section__header {
  display: grid;
  gap: 6px;
  padding: 16px;
}

.mobile-demo-section__title {
  margin: 0;
  color: var(--van-text-color);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}

.mobile-demo-section__description {
  margin: 0;
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.6;
}

.mobile-demo-section__body {
  min-width: 0;
}

:slotted(.mobile-demo-block) {
  overflow: hidden;
  background: var(--van-background-2);
}

:slotted(.mobile-demo-block--inset) {
  margin: 0 12px;
  border-radius: 16px;
}

:slotted(.mobile-demo-block--padded) {
  padding: 16px;
}
</style>
