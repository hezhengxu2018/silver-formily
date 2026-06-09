<script setup lang="ts">
defineProps<{
  response?: string | number | boolean | null
}>()
</script>

<template>
  <div class="as-wrapper">
    <div v-if="$slots.default" class="as-actions">
      <slot />
    </div>
    <div
      v-if="response !== undefined && response !== null && response !== ''"
      class="as-response"
    >
      Response：{{ response }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.as-wrapper {
  .as-actions {
    :deep(.el-button) {
      margin-right: 5px;
    }

    :deep(.el-button + .el-button) {
      margin-left: 0;
    }
  }

  .as-response {
    border: 2px dashed #f0bdbd;
    font-size: 14px;
    border-radius: 6px;
    padding: 8px 20px;
    margin-top: 10px;
  }
}
</style>
