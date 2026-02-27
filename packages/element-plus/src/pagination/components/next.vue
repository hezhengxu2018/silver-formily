<script lang="ts" setup>
import { ElIcon, useLocale } from 'element-plus'
import { computed } from 'vue'
import { paginationNextProps } from './next'

defineOptions({
  name: 'ElPaginationNext',
})

const props = defineProps(paginationNextProps)

defineEmits(['click'])

const { t } = useLocale()

const internalDisabled = computed(
  () =>
    props.disabled
    || props.currentPage === props.pageCount
    || props.pageCount === 0,
)
</script>

<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-label="nextText || t('el.pagination.next')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <ElIcon v-else>
      <component :is="nextIcon" />
    </ElIcon>
  </button>
</template>
