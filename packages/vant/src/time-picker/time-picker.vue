<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type {
  TimePickerPopupContentProps,
  TimePickerPopupProps,
  TimePickerPopupTimePickerProps,
  TimePickerProps,
  TimePickerResolvedValue,
} from './types'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, useCleanAttrs } from '../__builtins__'
import { createPopup } from '../create-popup'
import { usePickerInactiveState } from '../picker/use-picker-inactive-state'
import TimePickerPopupContent from './time-picker-popup-content.vue'
import {
  formatTimePickerValue,
  resolveTimePickerInnerValue,
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
  separator: ':',
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
    separator: props.separator,
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
const { isPopupReadonly, isTriggerDisabled } = usePickerInactiveState(props)

const popupBindings = computed(() => {
  return {
    ...props.popupProps,
  } satisfies TimePickerPopupProps & Record<string, unknown>
})
const sharedTimePickerProps = computed(() => {
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
    readonly: isPopupReadonly.value,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})
const popupTimePickerProps = computed<TimePickerPopupTimePickerProps>(() => {
  return {
    ...sharedTimePickerProps.value,
    modelValue: resolveTimePickerInnerValue(props.modelValue, resolvedTimePickerOptions.value),
  }
})
const popupContentProps = computed<TimePickerPopupContentProps>(() => {
  return {
    timePickerProps: popupTimePickerProps.value,
    resolveValue(selectedValues) {
      return resolveTimePickerModelValue(selectedValues, resolvedTimePickerOptions.value)
    },
  }
})

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  const popupController = createPopup<typeof TimePickerPopupContent, TimePickerResolvedValue>(
    popupBindings.value,
    TimePickerPopupContent,
    slots as FunctionalPopupSlots,
  )

  try {
    const popupPromise = popupController.open({
      ...popupContentProps.value,
    })
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
