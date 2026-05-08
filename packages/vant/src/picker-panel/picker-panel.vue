<script setup lang="ts">
import type { PickerOptionValue } from '../picker/types'
import type {
  PickerPanelProps,
  PickerPanelResolvedValue,
  PickerPanelSlots,
} from './types'
import { Picker as VanPicker } from 'vant'
import { computed, ref, watch } from 'vue'
import {
  normalizePickerColumns,
  resolvePickerInnerValue,
  resolvePickerModelValue,
} from '../picker/utils'

defineOptions({
  name: 'FPickerPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerPanelProps>(), {
  columns: () => [],
  showToolbar: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: PickerPanelResolvedValue]
  'confirm': [value: PickerPanelResolvedValue]
  'cancel': []
}>()
defineSlots<PickerPanelSlots>()

const resolvedInnerValue = computed(() => {
  return resolvePickerInnerValue(
    props.modelValue,
    props.columns,
    props.columnsFieldNames,
  )
})
const innerValue = ref<PickerOptionValue[]>(resolvedInnerValue.value)
const pickerProps = computed(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columns: normalizePickerColumns(props.columns, props.columnsFieldNames) as any,
    confirmButtonText: props.confirmButtonText,
    loading: props.loading,
    optionHeight: props.optionHeight,
    readonly: Boolean(props.readonly || props.disabled),
    showToolbar: props.showToolbar,
    swipeDuration: props.swipeDuration,
    title: props.title,
    toolbarPosition: props.toolbarPosition,
    visibleOptionNum: props.visibleOptionNum,
  }
})

watch(resolvedInnerValue, (value) => {
  innerValue.value = [...value]
})

function resolveValue(selectedValues: PickerOptionValue[]) {
  return resolvePickerModelValue(
    selectedValues,
    props.columns,
    props.columnsFieldNames,
  )
}

function onPickerValueChange(value: PickerOptionValue[]) {
  innerValue.value = [...value]
}

function onCancel() {
  innerValue.value = [...resolvedInnerValue.value]
  emit('cancel')
}

function onConfirm(payload: { selectedValues: PickerOptionValue[] }) {
  const value = resolveValue(payload.selectedValues)

  emit('update:modelValue', value)
  emit('confirm', value)
}
</script>

<template>
  <VanPicker
    v-bind="pickerProps"
    :model-value="innerValue"
    @update:model-value="onPickerValueChange"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <template v-if="$slots.option" #option="option">
      <slot name="option" v-bind="option ?? {}" />
    </template>

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

    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>

    <template v-if="$slots['columns-top']" #columns-top>
      <slot name="columns-top" />
    </template>

    <template v-if="$slots['columns-bottom']" #columns-bottom>
      <slot name="columns-bottom" />
    </template>
  </VanPicker>
</template>
