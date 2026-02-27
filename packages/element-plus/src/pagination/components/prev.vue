<script lang="ts" setup>
import { ElIcon, useLocale } from 'element-plus'
import { computed } from 'vue'
import { paginationPrevEmits, paginationPrevProps } from './prev'

defineOptions({
  name: 'ElPaginationPrev',
})

const props = defineProps(paginationPrevProps)
defineEmits(paginationPrevEmits)

const { t } = useLocale()

const internalDisabled = computed(
  () => props.disabled || props.currentPage <= 1,
)
</script>

<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    :aria-label="prevText || t('el.pagination.prev')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <ElIcon v-else>
      <component :is="prevIcon" />
    </ElIcon>
  </button>
</template>
