<script setup lang="ts">
import type { PickerOptionValue } from '../picker/types'
import type {
  PickerGroupDefaultSlotProps,
  PickerGroupPanelItemProps,
  PickerGroupPanelProps,
  PickerGroupResolvedValue,
  PickerGroupSlots,
  PickerGroupValueItem,
} from './types'
import { isValid } from '@formily/shared'
import { PickerGroup as VanPickerGroup } from 'vant'
import {
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'
import {
  clonePickerGroupValue,
  resolvePickerGroupModelValue,
  resolvePickerGroupSlotInnerValue,
  resolvePickerGroupTabs,
} from './utils'

defineOptions({
  name: 'FPickerGroupPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerGroupPanelProps>(), {
  dataSource: () => [],
  nextStepText: '下一步',
})

const emit = defineEmits<{
  'update:modelValue': [value: PickerGroupResolvedValue]
  'confirm': [value: PickerGroupResolvedValue]
  'cancel': [value: PickerGroupResolvedValue]
}>()

defineSlots<PickerGroupSlots>()

const activeTab = ref(0)
const innerValue = ref<Array<PickerGroupValueItem | undefined>>([])

function setValue(index: number, value: PickerGroupValueItem | undefined) {
  const nextValue = [...innerValue.value]
  nextValue[index] = Array.isArray(value) ? [...value] : value
  innerValue.value = nextValue

  return nextValue
}

const tabs = computed(() => {
  if (props.tabs?.length)
    return [...props.tabs]

  return resolvePickerGroupTabs(props.dataSource, props.columnsFieldNames)
})
const panelProps = computed(() => {
  return Array.from({ length: tabs.value.length }, (_, index) => createPanelProps(index))
})
const slotRendererProps = computed<PickerGroupDefaultSlotProps>(() => {
  return {
    dataSource: [...props.dataSource],
    modelValue: clonePickerGroupValue(
      resolvePickerGroupModelValue(innerValue.value as PickerGroupResolvedValue),
    ),
    panelProps: panelProps.value,
    setValue,
    values: innerValue.value.map(value => Array.isArray(value) ? [...value] : value),
  }
})

watch(
  [() => props.dataSource, () => props.modelValue, () => props.tabs],
  () => {
    resetInnerValue()
    resetActiveTab()
  },
  { deep: true, immediate: true },
)

const pickerGroupProps = computed(() => {
  return {
    activeTab: activeTab.value,
    cancelButtonText: props.cancelButtonText,
    confirmButtonText: props.confirmButtonText,
    nextStepText: tabs.value.length > 1 ? props.nextStepText : undefined,
    showToolbar: true,
    tabs: tabs.value,
    title: props.title,
  }
})

function onActiveTabChange(value: number | string) {
  activeTab.value = Number(value)
}

function createPanelProps(index: number): PickerGroupPanelItemProps {
  const value = innerValue.value[index]

  return {
    'allowHtml': props.allowHtml,
    'disabled': Boolean(props.disabled),
    'modelValue': Array.isArray(value) ? [...value] : value,
    'onConfirm': (value: unknown) => onSlotModelValueChange(index, value),
    'onUpdate:modelValue': (value: unknown) => onSlotModelValueChange(index, value),
    'optionHeight': props.optionHeight,
    'readonly': Boolean(props.readonly || props.readOnly || props.disabled),
    'showToolbar': false,
    'swipeDuration': props.swipeDuration,
    'visibleOptionNum': props.visibleOptionNum,
  }
}

function resetInnerValue() {
  innerValue.value = resolvePickerGroupSlotInnerValue(
    props.modelValue,
    tabs.value.length,
  )
}

function resetActiveTab() {
  activeTab.value = 0
}

function createValue(
  modelValue: Array<PickerGroupValueItem | undefined> | PickerGroupResolvedValue = innerValue.value,
) {
  return clonePickerGroupValue(
    resolvePickerGroupModelValue(modelValue as PickerGroupResolvedValue),
  )
}

function onCancel() {
  emit('cancel', createValue())
}

function onConfirm() {
  nextTick(() => {
    const nextValue = createValue()

    emit('update:modelValue', nextValue)
    emit('confirm', nextValue)
  })
}

function resolveSlotModelValue(value: unknown) {
  return Array.isArray(value)
    ? [...value] as PickerOptionValue[]
    : isValid(value)
      ? value as PickerOptionValue
      : undefined
}

function onSlotModelValueChange(tabIndex: number, value: unknown) {
  setValue(tabIndex, resolveSlotModelValue(value))
}
</script>

<template>
  <VanPickerGroup
    v-bind="pickerGroupProps"
    @update:active-tab="onActiveTabChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <slot v-bind="slotRendererProps" />

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.cancel" #cancel>
      <slot name="cancel" />
    </template>

    <template v-if="$slots.confirm" #confirm>
      <slot name="confirm" />
    </template>

    <template v-if="$slots.toolbar" #toolbar>
      <slot name="toolbar" />
    </template>
  </VanPickerGroup>
</template>
