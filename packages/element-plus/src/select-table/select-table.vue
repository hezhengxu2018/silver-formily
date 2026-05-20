<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import type { ISelectTableProps } from './types'
import { isEqual, isFn, isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import {
  ElLink,
  ElRadio,
  ElRadioGroup,
  ElTable,
  ElTableColumn,
  useAttrs,
  version,
  vLoading,
} from 'element-plus'
import { differenceWith, remove, uniq, uniqWith, xor } from 'lodash-es'
import { computed, nextTick, ref, watch } from 'vue'
import { lt, stylePrefix } from '../__builtins__'

defineOptions({
  name: 'FSelectTable',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ISelectTableProps>(), {
  columns: () => [],
  mode: 'multiple',
  dataSource: () => [],
  optionAsValue: false,
  valueType: 'all',
  loading: false,
  clickRowToSelect: true,
  showAlertToolbar: true,
  ignoreSelectable: true,
})

const emit = defineEmits(['update:modelValue'])

const elTableProps = useAttrs()
const field = useField()
const elTableRef = ref<TableInstance>()
const radioSelectedKey = ref()

function requireRowKey() {
  if (!props.rowKey) {
    throw new Error('rowKey is required')
  }
  return props.rowKey
}

function getRowValue(item?: Record<string, any> | null) {
  if (!props.rowKey || !item) {
    return undefined
  }
  return item[props.rowKey]
}

function getSingleSelectedKey(value: any) {
  if (!isValid(value)) {
    return null
  }
  return props.optionAsValue ? getRowValue(value) ?? null : value
}

function getMultipleSelectedKeys(value: any) {
  if (!Array.isArray(value)) {
    return []
  }
  return value
    .map(item => props.optionAsValue ? getRowValue(item) : item)
    .filter(isValid)
}

function syncRadioSelection(item?: Record<string, any> | null) {
  radioSelectedKey.value = getRowValue(item) ?? null
  elTableRef.value?.setCurrentRow(item)
}

function compatibleRadioValue(key: string) {
  return lt(version, '2.6.0') ? { label: key } : { value: key }
}

function getInitialSelectedList() {
  if (!isValid(props.modelValue)) {
    return []
  }

  if (props.mode === 'multiple') {
    if (!Array.isArray(props.modelValue)) {
      return []
    }

    return props.modelValue.map((item) => {
      if (!props.optionAsValue) {
        if (!props.rowKey) {
          return null
        }
        return {
          [props.rowKey]: item,
        }
      }
      return item
    }).filter(isValid)
  }
  else {
    if (props.optionAsValue) {
      return [props.modelValue]
    }
    if (!props.rowKey) {
      return []
    }
    return [{ [props.rowKey]: props.modelValue }]
  }
}
const initialSelectedList = getInitialSelectedList()
const selectedFlatDataSource = ref(initialSelectedList)
// 为了获取移除的项而缓存的当前页面的前一次选择。由于element-plus没有获取移除项的方法，需要通过这种方式移除field中移除的项
let prevSelection = []

const currentSelectLength = computed(() => {
  if (props.mode === 'multiple') {
    return Array.isArray(props.modelValue) ? props.modelValue.length : 0
  }
  else {
    return isValid(radioSelectedKey.value) ? 1 : 0
  }
})

watch(
  () => props.dataSource,
  async () => {
    const selectedKeys = uniq(
      selectedFlatDataSource.value.map(item => getRowValue(item)).filter(isValid),
    )
    await nextTick()
    for (const item of props.dataSource) {
      const itemKey = getRowValue(item)
      if (isValid(itemKey) && selectedKeys.includes(itemKey)) {
        if (props.mode === 'multiple') {
          elTableRef.value?.toggleRowSelection(item, true, props.ignoreSelectable)
        }
        else {
          syncRadioSelection(item)
        }
      }
      await nextTick()
      prevSelection = elTableRef.value?.getSelectionRows() ?? []
    }
  },
  { immediate: true },
)

watch(
  () => [props.modelValue, props.loading],
  async ([value, loading]) => {
    if (loading) {
      return
    }
    if (props.mode === 'single') {
      const selectedKey = getSingleSelectedKey(value)
      radioSelectedKey.value = selectedKey
      const selectedItem = props.dataSource.find(item => getRowValue(item) === selectedKey)
      elTableRef.value?.setCurrentRow(selectedItem)
    }
    else {
      await nextTick()
      const currentDisplayDataKeys = elTableRef.value
        ?.getSelectionRows()
        .map(item => getRowValue(item))
        .filter(isValid) ?? []
      const valueKeys = getMultipleSelectedKeys(value)
      selectedFlatDataSource.value = selectedFlatDataSource.value.filter(
        item => valueKeys.includes(getRowValue(item)),
      )
      if (isEqual(valueKeys, currentDisplayDataKeys)) {
        return
      }
      const diffItems = xor(valueKeys, currentDisplayDataKeys)
      for (const tableItem of props.dataSource) {
        const itemKey = getRowValue(tableItem)
        if (isValid(itemKey) && diffItems.includes(itemKey)) {
          const shouldSelect = valueKeys.includes(itemKey)
          elTableRef.value?.toggleRowSelection(tableItem, shouldSelect, props.ignoreSelectable)
        }
      }
    }
  },
  {
    immediate: true,
  },
)

function onSelect(newSelection: Record<string, any>[]) {
  const rowKey = requireRowKey()

  const removedItemList
    = prevSelection.length > newSelection.length
      ? differenceWith(
          prevSelection,
          newSelection,
          (itemPrev, itemNext) => {
            return itemPrev[rowKey] === itemNext[rowKey]
          },
        )
      : []
  prevSelection = [...newSelection]
  selectedFlatDataSource.value = uniqWith(
    [...selectedFlatDataSource.value, ...newSelection],
    (itemPrev, itemNext) => {
      return itemPrev[rowKey] === itemNext[rowKey]
    },
  )
  if (removedItemList.length > 0) {
    const removedKeys = uniq(removedItemList.map(item => item[rowKey]))
    remove(selectedFlatDataSource.value, item =>
      removedKeys.includes(item[rowKey]))
  }

  if (props.optionAsValue) {
    emit('update:modelValue', selectedFlatDataSource.value)
  }
  else {
    const selectedKeys = selectedFlatDataSource.value.map(
      item => item[rowKey],
    )
    emit('update:modelValue', selectedKeys)
  }
}

function onRadioClick(item) {
  const rowKey = requireRowKey()
  syncRadioSelection(item)
  if (props.optionAsValue) {
    emit('update:modelValue', item)
  }
  else {
    emit('update:modelValue', item[rowKey])
  }
}

function onRowClick(row: Record<string, any>, _, event: Event) {
  if (!props.clickRowToSelect)
    return

  if (props.mode === 'multiple') {
    const checkboxDOM = (event.target as Element)
      .closest('tr')
      .querySelector('input[type="checkbox"]')
    if (checkboxDOM instanceof HTMLElement) {
      checkboxDOM.click()
    }
  }
  else {
    const radioDOM = (event.target as Element)
      .closest('tr')
      .querySelector('input[type="radio"]')
    if (radioDOM instanceof HTMLElement) {
      radioDOM.click()
    }
  }
}

function onClearSelectionClick() {
  if (props.mode === 'multiple') {
    emit('update:modelValue', [])
    selectedFlatDataSource.value = []
  }
  else {
    syncRadioSelection(null)
    emit('update:modelValue', null)
  }
}

function selectable(row: Record<string, any>, index: number) {
  if (props.selectable && isFn(props.selectable)) {
    return props.selectable(row, index, field.value)
  }
  return true
}
</script>

<template>
  <div :class="`${stylePrefix}-select-table`">
    <div
      v-if="currentSelectLength > 0 && props.showAlertToolbar"
      :class="`${stylePrefix}-select-table-alert-container`"
    >
      <span>已选择 {{ currentSelectLength }} 项</span>
      <ElLink
        type="primary"
        :underline="lt(version, '2.9.9') ? false : 'never'"
        style="margin-left: 8px;"
        @click="onClearSelectionClick"
      >
        取消选择
      </ElLink>
    </div>
    <ElTable
      ref="elTableRef"
      v-loading="props.loading"
      v-bind="elTableProps"
      :row-key="rowKey"
      :row-class-name="props.clickRowToSelect ? `--click-row-select` : ''"
      :data="props.dataSource"
      :highlight-current-row="props.mode === 'single'"
      @select="onSelect"
      @select-all="onSelect"
      @row-click="onRowClick"
    >
      <ElTableColumn
        v-if="props.mode === 'multiple'"
        type="selection"
        :selectable="selectable"
      />
      <ElTableColumn
        v-else
        width="46"
      >
        <template #default="{ row }">
          <ElRadioGroup v-model="radioSelectedKey" style="width: 100%;">
            <ElRadio
              v-bind="compatibleRadioValue(row[rowKey])"
              @change="() => onRadioClick(row)"
            >
              &nbsp;
            </ElRadio>
          </ElRadioGroup>
        </template>
      </ElTableColumn>
      <template v-if="props.columns.length === 0">
        <slot />
      </template>
      <template v-else>
        <ElTableColumn
          v-for="colItem of props.columns"
          v-bind="colItem"
          :key="colItem.prop || colItem.type"
        />
      </template>
    </ElTable>
  </div>
</template>
