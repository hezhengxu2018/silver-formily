<script lang="ts" setup>
import { isArr, isEqual } from '@formily/shared'
import { ElOption, ElSelect, useLocale, useNamespace } from 'element-plus'
import { usePagination } from 'element-plus/es/components/pagination/src/usePagination'
import { computed, ref, watch } from 'vue'
import { paginationSizesProps } from './sizes'

defineOptions({
  name: 'ElPaginationSizes',
})

const props = defineProps(paginationSizesProps)
const emit = defineEmits(['page-size-change'])
const { t } = useLocale()
const ns = useNamespace('pagination')
const pagination = usePagination()
const innerPageSize = ref<number>(props.pageSize!)

watch(
  () => props.pageSizes,
  (newVal, oldVal) => {
    if (isEqual(newVal, oldVal))
      return
    if (isArr(newVal)) {
      const pageSize = newVal.includes(props.pageSize!)
        ? props.pageSize
        : props.pageSizes[0]
      // eslint-disable-next-line vue/custom-event-name-casing
      emit('page-size-change', pageSize)
    }
  },
)

watch(
  () => props.pageSize,
  (newVal) => {
    innerPageSize.value = newVal!
  },
)

const innerPageSizes = computed(() => props.pageSizes)
function handleChange(val: number) {
  if (val !== innerPageSize.value) {
    innerPageSize.value = val
    pagination.handleSizeChange?.(Number(val))
  }
}
</script>

<template>
  <span :class="ns.e('sizes')">
    <ElSelect
      :model-value="innerPageSize"
      :disabled="disabled"
      :popper-class="popperClass"
      :size="size"
      :teleported="teleported"
      :validate-event="false"
      :append-to="appendSizeTo"
      @change="handleChange"
    >
      <ElOption
        v-for="item in innerPageSizes"
        :key="item"
        :value="item"
        :label="item + t('el.pagination.pagesize')"
      />
    </ElSelect>
  </span>
</template>
