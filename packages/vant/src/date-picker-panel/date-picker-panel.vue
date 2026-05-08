<script setup lang="ts">
import type {
  DatePickerPanelProps,
  DatePickerPanelResolvedValue,
  DatePickerPanelSlots,
} from './types'
import { DatePicker as VanDatePicker } from 'vant'
import { computed, ref, watch } from 'vue'
import {
  resolveDatePickerBoundaryDates,
  resolveDatePickerInnerValue,
  resolveDatePickerModelValue,
} from '../date-picker/utils'

defineOptions({
  name: 'FDatePickerPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DatePickerPanelProps>(), {
  columnsType: () => ['year', 'month', 'day'],
  separator: '-',
  showToolbar: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: DatePickerPanelResolvedValue]
  'confirm': [value: DatePickerPanelResolvedValue]
  'cancel': []
}>()
defineSlots<DatePickerPanelSlots>()

const resolvedDatePickerOptions = computed(() => {
  return {
    columnsType: props.columnsType,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    maxDate: props.maxDate,
    minDate: props.minDate,
    separator: props.separator,
    valueFormat: props.valueFormat,
  }
})
const boundaryDates = computed(() => resolveDatePickerBoundaryDates(resolvedDatePickerOptions.value))
const resolvedInnerValue = computed(() => {
  return resolveDatePickerInnerValue(props.modelValue, resolvedDatePickerOptions.value)
})
const innerValue = ref<string[]>(resolvedInnerValue.value)
const datePickerProps = computed(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columnsType: props.columnsType,
    confirmButtonText: props.confirmButtonText,
    filter: props.filter,
    formatter: props.formatter,
    loading: props.loading,
    maxDate: boundaryDates.value.maxDate,
    minDate: boundaryDates.value.minDate,
    optionHeight: props.optionHeight,
    readonly: Boolean(props.readonly || props.disabled),
    showToolbar: props.showToolbar,
    swipeDuration: props.swipeDuration,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})

watch(resolvedInnerValue, (value) => {
  innerValue.value = [...value]
})

function resolveValue(selectedValues: string[]) {
  return resolveDatePickerModelValue(selectedValues, resolvedDatePickerOptions.value)
}

function onPickerValueChange(value: string[]) {
  innerValue.value = [...value]
}

function onCancel() {
  innerValue.value = [...resolvedInnerValue.value]
  emit('cancel')
}

function onConfirm(payload: { selectedValues: string[] }) {
  const value = resolveValue(payload.selectedValues)

  emit('update:modelValue', value)
  emit('confirm', value)
}
</script>

<template>
  <VanDatePicker
    v-bind="datePickerProps"
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

    <template v-if="$slots['columns-top']" #columns-top>
      <slot name="columns-top" />
    </template>

    <template v-if="$slots['columns-bottom']" #columns-bottom>
      <slot name="columns-bottom" />
    </template>
  </VanDatePicker>
</template>
