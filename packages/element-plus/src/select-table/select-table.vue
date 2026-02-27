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

function compatibleRadioValue(key: string) {
  return lt(version, '2.6.0') ? { label: key } : { value: key }
}

const elTableRef = ref<TableInstance>()
const rowKey = props.rowKey
function getInitialSelectedList() {
  if (props.mode === 'multiple') {
    return props.modelValue?.map((item) => {
      if (!props.optionAsValue) {
        return {
          [rowKey]: item,
        }
      }
      return item
    }) ?? []
  }
  else {
    return props.optionAsValue ? [props.modelValue] : [{ [rowKey]: props.modelValue }]
  }
}
const initialSelectedList = getInitialSelectedList()
const selectedFlatDataSource = ref(initialSelectedList)
// 为了获取移除的项而缓存的当前页面的前一次选择。由于element-plus没有获取移除项的方法，需要通过这种方式移除field中移除的项
let prevSelection = []

const radioSelectedKey = ref()

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
      selectedFlatDataSource.value.map(item => item[rowKey]),
    )
    await nextTick()
    for (const item of props.dataSource) {
      if (selectedKeys.includes(item[rowKey])) {
        if (props.mode === 'multiple') {
          elTableRef.value?.toggleRowSelection(item, true, props.ignoreSelectable)
        }
        else {
          elTableRef.value?.setCurrentRow(item)
          onRadioClick(item)
        }
      }
      await nextTick()
      prevSelection = elTableRef.value?.getSelectionRows()
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
      radioSelectedKey.value = props.optionAsValue ? value[rowKey] : value
    }
    else {
      await nextTick()
      const currentDisplayDataKeys = elTableRef.value
        ?.getSelectionRows()
        .map(item => item[rowKey])
      const valueKeys = props.optionAsValue
        ? value?.map(item => item[rowKey])
        : value ?? []
      selectedFlatDataSource.value = selectedFlatDataSource.value.filter(
        item => valueKeys.includes(item[rowKey]),
      )
      if (isEqual(valueKeys, currentDisplayDataKeys)) {
        return
      }
      const diffItems = xor(valueKeys, currentDisplayDataKeys)
      for (const tableItem of props.dataSource) {
        if (diffItems.includes(tableItem[rowKey])) {
          const shouldSelect = valueKeys.includes(tableItem[rowKey])
          elTableRef.value.toggleRowSelection(tableItem, shouldSelect, props.ignoreSelectable)
        }
      }
    }
  },
  {
    immediate: true,
  },
)

function onSelect(newSelection: Record<string, any>[]) {
  /* istanbul ignore if -- @preserve */
  if (!rowKey) {
    throw new Error('rowKey is required')
  }

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
  radioSelectedKey.value = item[rowKey]
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
    radioSelectedKey.value = null
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
