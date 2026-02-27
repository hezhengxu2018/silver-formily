<script lang="ts" setup>
import { useLocale, useNamespace } from 'element-plus'
import { usePagination } from 'element-plus/es/components/pagination/src/usePagination'
import { paginationTotalProps } from './total'

defineOptions({
  name: 'ElPaginationTotal',
})
defineProps(paginationTotalProps)
const { t } = useLocale()
const ns = useNamespace('pagination')
const { disabled } = usePagination()
</script>

<template>
  <span :class="ns.e('total')" :disabled="disabled">
    {{
      t('el.pagination.total', {
        total,
      })
    }}
  </span>
</template>
