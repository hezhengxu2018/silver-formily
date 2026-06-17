<template>
  <section class="editor-canvas">
    <div class="editor-canvas__form" />
  </section>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.editor-canvas {
  @apply flex w-full items-center justify-center;
}

.editor-canvas__form {
  @apply relative mx-auto w-full rounded-lg border bg-white;
  width: min(100%, 42rem);
  min-height: 40rem;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}
</style>
