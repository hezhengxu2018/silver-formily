<script setup lang="ts">
import type {
  TimePickerPanelProps,
  TimePickerPanelResolvedValue,
  TimePickerPanelSlots,
} from './types'
import { TimePicker as VanTimePicker } from 'vant'
import { computed, ref, watch } from 'vue'
import {
  resolveTimePickerInnerValue,
  resolveTimePickerModelValue,
} from '../time-picker/utils'

defineOptions({
  name: 'FTimePickerPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TimePickerPanelProps>(), {
  columnsType: () => ['hour', 'minute'],
  showToolbar: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: TimePickerPanelResolvedValue]
  'confirm': [value: TimePickerPanelResolvedValue]
  'cancel': []
}>()
defineSlots<TimePickerPanelSlots>()

const resolvedTimePickerOptions = computed(() => {
  return {
    columnsType: props.columnsType,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    maxHour: props.maxHour,
    maxMinute: props.maxMinute,
    maxSecond: props.maxSecond,
    maxTime: props.maxTime,
    minHour: props.minHour,
    minMinute: props.minMinute,
    minSecond: props.minSecond,
    minTime: props.minTime,
    valueFormat: props.valueFormat,
  }
})
const resolvedInnerValue = computed(() => {
  return resolveTimePickerInnerValue(props.modelValue, resolvedTimePickerOptions.value)
})
const innerValue = ref<string[]>(resolvedInnerValue.value)
const timePickerProps = computed(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columnsType: props.columnsType,
    confirmButtonText: props.confirmButtonText,
    filter: props.filter,
    formatter: props.formatter,
    loading: props.loading,
    maxHour: props.maxHour,
    maxMinute: props.maxMinute,
    maxSecond: props.maxSecond,
    maxTime: props.maxTime,
    minHour: props.minHour,
    minMinute: props.minMinute,
    minSecond: props.minSecond,
    minTime: props.minTime,
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

function onPickerValueChange(value: string[]) {
  innerValue.value = [...value]
}

function onCancel() {
  innerValue.value = [...resolvedInnerValue.value]
  emit('cancel')
}

function onConfirm(payload: { selectedValues: string[] }) {
  const value = resolveTimePickerModelValue(payload.selectedValues, resolvedTimePickerOptions.value)

  emit('update:modelValue', value)
  emit('confirm', value)
}
</script>

<template>
  <VanTimePicker
    v-bind="timePickerProps"
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
  </VanTimePicker>
</template>
