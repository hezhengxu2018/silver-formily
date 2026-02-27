<script setup lang="ts">
import type { Field } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import type { PropType } from 'vue'
import type {
  QueryFormItemMode,
  QueryFormItemPaginationMap,
  QueryFormItemPaginationProps,
  QueryFormItemQueryProps,
  QueryFormItemRequest,
  QueryFormItemRequestSuccessPayload,
} from './types'
import { createForm } from '@formily/core'
import { isNum } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ElPagination } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { FormBaseItem } from '../form-item'
import { QueryForm } from '../query-form'
import { useQueryFormForm } from '../query-form/hooks'

defineOptions({
  name: 'FQueryFormItem',
  inheritAttrs: false,
})

const props = defineProps({
  mode: {
    type: String as PropType<QueryFormItemMode>,
    default: 'default',
  },
  request: Function as PropType<QueryFormItemRequest>,
  clearOnDataChange: {
    type: Boolean,
    default: false,
  },
  querySchema: Object as PropType<ISchema>,
  queryFormProps: {
    type: Object as PropType<QueryFormItemQueryProps>,
    default: () => ({}),
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  paginationProps: {
    type: Object as PropType<QueryFormItemPaginationProps>,
    default: () => ({}),
  },
  paginationMap: {
    type: Object as PropType<QueryFormItemPaginationMap>,
    default: () => ({}),
  },
  immediate: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'requestSuccess', payload: QueryFormItemRequestSuccessPayload): void
  (e: 'requestFailed', error: any): void
}>()

const defaultPaginationProps: QueryFormItemPaginationProps = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, prev, pager, next',
  size: 'small',
}
const defaultPaginationRequestMapping: Required<QueryFormItemPaginationMap> = {
  current: 'current',
  pageSize: 'pageSize',
}

const fieldRef = useField<Field>()
const internalQueryForm = createForm()
const prefixCls = `${stylePrefix}-query-form-item`
const formItemInternalClass = `${stylePrefix}-form-item--isolated`
const { props: formItemProps } = useCleanAttrs()

const paginationBindings = computed(() => {
  const {
    currentPage,
    pageSize,
    ...bindings
  } = {
    ...defaultPaginationProps,
    ...props.paginationProps,
  }
  return bindings
})

const currentPageRef = ref(props.paginationProps?.currentPage ?? defaultPaginationProps.currentPage)
const pageSizeRef = ref(props.paginationProps?.pageSize ?? defaultPaginationProps.pageSize)
const totalRef = ref(0)
const currentRequestId = ref(0)

const { activeForm: activeQueryForm } = useQueryFormForm({
  formProps: computed(() => props.queryFormProps),
  fallbackForm: internalQueryForm,
})

const queryFormBindings = computed(() => {
  return ({
    ...props.queryFormProps,
    schema: props.querySchema ?? props.queryFormProps.schema,
    form: activeQueryForm.value,
    onAutoSubmit: handleQuerySubmit,
    resetProps: {
      onClick: handleQueryReset,
    },
  })
})

async function executeRequest() {
  if (!props.request)
    return

  const field = fieldRef.value
  if (!Array.isArray(field.dataSource))
    field.dataSource = []

  const requestId = ++currentRequestId.value
  /* istanbul ignore next -- @preserve defensive: active query form can be temporarily undefined before form injection settles */
  const queryValues = activeQueryForm.value?.values ?? {}
  const paginationData = props.pagination
    ? {
        current: currentPageRef.value,
        pageSize: pageSizeRef.value,
      }
    : undefined
  const requestParams = paginationData
    ? {
        ...queryValues,
        [(props.paginationMap.current ?? defaultPaginationRequestMapping.current)]: paginationData.current,
        [(props.paginationMap.pageSize ?? defaultPaginationRequestMapping.pageSize)]: paginationData.pageSize,
      }
    : queryValues

  field.loading = true
  try {
    const result = await props.request(requestParams)

    if (requestId !== currentRequestId.value)
      return

    if (result.success !== true) {
      emit('requestFailed', result)
      return
    }

    field.dataSource = result.data
    if (props.clearOnDataChange) {
      field.setValue?.(undefined)
    }
    totalRef.value = isNum(result.total) ? result.total : result.data.length

    emit('requestSuccess', {
      values: queryValues,
      pagination: paginationData,
      dataSource: result.data,
      total: totalRef.value,
      result,
    })
  }
  catch (error) {
    if (requestId !== currentRequestId.value)
      return
    emit('requestFailed', error)
  }
  finally {
    if (requestId === currentRequestId.value)
      field.loading = false
  }
}

async function handleQuerySubmit() {
  if (props.pagination && currentPageRef.value !== 1) {
    currentPageRef.value = 1
    return
  }

  await executeRequest()
}

function handleQueryReset(event: MouseEvent) {
  const userOnClick = props.queryFormProps.resetProps?.onClick as ((event: MouseEvent) => void | boolean) | undefined
  const result = userOnClick?.(event)
  if (result === false)
    return false

  void handleQuerySubmit()

  return result
}

onMounted(() => {
  if (props.immediate)
    void executeRequest()
})

watch([currentPageRef, pageSizeRef], ([currentPage, pageSize], [previousPage, previousPageSize]) => {
  /* istanbul ignore if -- @preserve defensive: watcher is retained when pagination is dynamically toggled off */
  if (!props.pagination)
    return

  const currentChanged = currentPage !== previousPage
  const pageSizeChanged = pageSize !== previousPageSize

  /* istanbul ignore if -- @preserve defensive: keep guard for unexpected duplicated watcher payload */
  if (!currentChanged && !pageSizeChanged)
    return

  if (pageSizeChanged && currentPage !== 1) {
    currentPageRef.value = 1
    return
  }

  void executeRequest()
})
</script>

<template>
  <FormBaseItem
    v-bind="formItemProps"
    :internal-form-item-class="formItemInternalClass"
  >
    <div :class="prefixCls">
      <component
        :is="props.mode === 'light' ? QueryForm.Light : QueryForm"
        v-bind="queryFormBindings"
      />
      <div :class="`${prefixCls}__content`">
        <slot />
      </div>
      <ElPagination
        v-if="props.pagination"
        v-model:current-page="currentPageRef"
        v-model:page-size="pageSizeRef"
        :class="`${prefixCls}__pagination`"
        v-bind="paginationBindings"
        :total="totalRef"
      />
    </div>
  </FormBaseItem>
</template>
