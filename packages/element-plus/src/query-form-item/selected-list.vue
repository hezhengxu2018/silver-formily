<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import type {
  QueryFormItemSelectedListItem,
  QueryFormItemSelectedListText,
} from './types'
import { Close } from '@element-plus/icons-vue'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { isFn, isValid } from '@silver-formily/shared'
import { useField } from '@silver-formily/vue'
import { ElIcon, ElLink, useLocale, version } from 'element-plus'
import { computed } from 'vue'
import { lt, stylePrefix } from '../__builtins__'

const props = withDefaults(defineProps<{
  itemText: QueryFormItemSelectedListText
  width?: number
  selectionText?: string | ((count: number) => string)
  clearSelectionText?: string
}>(), {
  width: 250,
})

const fieldRef = useField<Field>()
const { lang } = useLocale()
const prefixCls = `${stylePrefix}-query-form-item`

const isChineseLocale = computed(() => lang.value.toLowerCase().startsWith('zh'))
const fieldComponentProps = computed(() => {
  const component = fieldRef.value?.component
  return Array.isArray(component) ? (component[1] ?? {}) : {}
})
const isMultiple = computed(() => fieldComponentProps.value.mode !== 'single')
const rowKey = computed(() => fieldComponentProps.value.rowKey)
const optionAsValue = computed(() => fieldComponentProps.value.optionAsValue === true)
const dataSource = reactiveComputed<Record<string, any>[]>(() => {
  const source = fieldRef.value?.dataSource
  return Array.isArray(source) ? source : []
})

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getRecordValue(record: Record<string, any>) {
  const key = rowKey.value
  return key ? record[key] : undefined
}

function findRecord(value: any) {
  const key = rowKey.value
  if (!key)
    return undefined
  return dataSource.value.find(item => item?.[key] === value)
}

function createSelectedItem(rawValue: any, index: number): QueryFormItemSelectedListItem {
  const record = optionAsValue.value && isRecord(rawValue)
    ? rawValue
    : findRecord(rawValue)
  return {
    value: record ? getRecordValue(record) ?? rawValue : rawValue,
    rawValue,
    record,
    index,
  }
}

const selectedItems = reactiveComputed(() => {
  const value = fieldRef.value?.value
  if (isMultiple.value) {
    return Array.isArray(value)
      ? value.reduce<QueryFormItemSelectedListItem[]>((items, item, index) => {
          if (isValid(item)) {
            items.push(createSelectedItem(item, index))
          }
          return items
        }, [])
      : []
  }
  return isValid(value) ? [createSelectedItem(value, 0)] : []
})
const selectedDisplayItems = computed(() => {
  return selectedItems.value.map(item => ({
    ...item,
    text: props.itemText?.(item) ?? String(item.value),
  }))
})
const currentSelectLength = computed(() => selectedDisplayItems.value.length)
const selectionText = computed(() => {
  const count = currentSelectLength.value
  if (isFn(props.selectionText)) {
    return props.selectionText(count)
  }
  if (props.selectionText !== undefined) {
    return props.selectionText.replaceAll('{count}', String(count))
  }
  return isChineseLocale.value
    ? `已选择 ${count} 项`
    : `${count} ${count === 1 ? 'item' : 'items'} selected`
})
const clearSelectionText = computed(() => {
  return props.clearSelectionText ?? (isChineseLocale.value ? '取消选择' : 'Clear selection')
})

function onClearSelectionClick() {
  const field = fieldRef.value
  if (!field)
    return
  field.setValue?.(isMultiple.value ? [] : null)
}

function onRemoveSelectedItemClick(item: QueryFormItemSelectedListItem) {
  const field = fieldRef.value
  if (!field)
    return

  if (!isMultiple.value) {
    field.setValue?.(null)
    return
  }

  const value = field.value
  if (!Array.isArray(value))
    return

  const nextValue = value.slice()
  nextValue.splice(item.index, 1)
  field.setValue?.(nextValue)
}
</script>

<template>
  <div
    :class="`${prefixCls}__selected-list`"
    :style="{ width: `${props.width}px` }"
  >
    <div :class="`${stylePrefix}-select-table-alert-container`">
      <span>{{ selectionText }}</span>
      <ElLink
        v-if="currentSelectLength > 0"
        type="primary"
        :underline="lt(version, '2.9.9') ? false : 'never'"
        style="margin-left: 8px;"
        @click="onClearSelectionClick"
      >
        {{ clearSelectionText }}
      </ElLink>
    </div>
    <div :class="`${prefixCls}__selected-list-table`">
      <div
        v-for="item of selectedDisplayItems"
        :key="`${item.index}-${item.value}`"
        :class="`${prefixCls}__selected-list-row`"
      >
        <div
          :class="`${prefixCls}__selected-list-cell`"
          :title="item.text"
        >
          {{ item.text }}
        </div>
        <button
          type="button"
          :class="`${prefixCls}__selected-list-remove`"
          :aria-label="`Remove item: ${item.text}`"
          @click.stop="onRemoveSelectedItemClick(item)"
        >
          <ElIcon>
            <Close />
          </ElIcon>
        </button>
      </div>
    </div>
  </div>
</template>
