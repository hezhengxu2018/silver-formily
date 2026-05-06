<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type { TimePickerPanelProps } from '../time-picker-panel'
import type {
  TimePickerPopupProps,
  TimePickerProps,
  TimePickerResolvedValue,
} from './types'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, useCleanAttrs, usePopupTriggerState } from '../__builtins__'
import { createPopup } from '../create-popup'
import TimePickerPanel from '../time-picker-panel/time-picker-panel.vue'
import {
  formatTimePickerValue,
  resolveTimePickerModelValue,
  resolveTimePickerSelectedOptions,
} from './utils'

defineOptions({
  name: 'FTimePicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TimePickerProps>(), {
  columnsType: () => ['hour', 'minute'],
  popupProps: () => ({}),
})

const emit = defineEmits<{
  'update:modelValue': [value: TimePickerResolvedValue]
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const { props: triggerInputProps } = useCleanAttrs()

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

const resolvedValue = computed(() => {
  return resolveTimePickerModelValue(props.modelValue, resolvedTimePickerOptions.value)
})
const selectedOptions = computed(() => {
  return resolveTimePickerSelectedOptions(props.modelValue, resolvedTimePickerOptions.value)
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      resolvedValue.value,
      [...selectedOptions.value],
    )
  }

  return formatTimePickerValue(resolvedValue.value, resolvedTimePickerOptions.value)
})
const { isTriggerDisabled, isTriggerReadonly } = usePopupTriggerState({
  disabled: () => Boolean(props.disabled),
  readonly: () => Boolean(props.readonly),
})

const popupBindings = computed(() => {
  return {
    ...props.popupProps,
  } satisfies TimePickerPopupProps & Record<string, unknown>
})
const panelProps = computed<TimePickerPanelProps>(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columnsType: props.columnsType,
    confirmButtonText: props.confirmButtonText,
    filter: props.filter,
    format: props.format,
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
    modelValue: props.modelValue,
    optionHeight: props.optionHeight,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    valueFormat: props.valueFormat,
    visibleOptionNum: props.visibleOptionNum,
  }
})

async function open() {
  if (isTriggerDisabled.value || isTriggerReadonly.value) {
    return
  }

  const popupController = createPopup<typeof TimePickerPanel, TimePickerResolvedValue>(
    popupBindings.value,
    TimePickerPanel,
    slots as FunctionalPopupSlots,
  )

  try {
    const popupPromise = popupController.open(panelProps)
    emit('opened')

    const result = await popupPromise

    emit('update:modelValue', result)
  }
  catch {
  }
  finally {
    emit('closed')
  }
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="isTriggerDisabled"
    :value="displayText"
    :placeholder="props.placeholder || '请选择时间'"
    @click="open"
  />
</template>
