<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type {
  DatePickerPopupContentProps,
  DatePickerPopupDatePickerProps,
  DatePickerPopupProps,
  DatePickerProps,
  DatePickerResolvedValue,
  PickerOption,
} from './types'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, useCleanAttrs } from '../__builtins__'
import { createPopup } from '../create-popup'
import { usePickerInactiveState } from '../picker/use-picker-inactive-state'
import DatePickerPopupContent from './date-picker-popup-content.vue'
import {
  formatDatePickerValue,
  resolveDatePickerInnerValue,
  resolveDatePickerModelValue,
  resolveDatePickerSelectedOptions,
} from './utils'

defineOptions({
  name: 'FDatePicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DatePickerProps>(), {
  columnsType: () => ['year', 'month', 'day'],
  popupProps: () => ({}),
  separator: '-',
})

const emit = defineEmits<{
  'update:modelValue': [value: DatePickerResolvedValue]
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const { props: triggerInputProps } = useCleanAttrs()

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

const resolvedValue = computed(() => {
  if (!props.displayFormatter)
    return props.modelValue ?? null

  return resolveDatePickerModelValue(props.modelValue, resolvedDatePickerOptions.value)
})
const selectedOptions = computed(() => {
  if (!props.displayFormatter)
    return [] as Array<PickerOption | undefined>

  return resolveDatePickerSelectedOptions(props.modelValue, resolvedDatePickerOptions.value)
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      resolvedValue.value,
      [...selectedOptions.value],
    )
  }

  return formatDatePickerValue(props.modelValue ?? null, resolvedDatePickerOptions.value)
})
const { isPopupReadonly, isTriggerDisabled } = usePickerInactiveState(props)

const popupBindings = computed(() => {
  return {
    ...props.popupProps,
  } satisfies DatePickerPopupProps & Record<string, unknown>
})
const sharedDatePickerProps = computed(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columnsType: props.columnsType,
    confirmButtonText: props.confirmButtonText,
    filter: props.filter,
    formatter: props.formatter,
    loading: props.loading,
    maxDate: props.maxDate,
    minDate: props.minDate,
    optionHeight: props.optionHeight,
    readonly: isPopupReadonly.value,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})
const popupDatePickerProps = computed<DatePickerPopupDatePickerProps>(() => {
  return {
    ...sharedDatePickerProps.value,
    modelValue: resolveDatePickerInnerValue(props.modelValue, resolvedDatePickerOptions.value),
  }
})
const popupContentProps = computed<DatePickerPopupContentProps>(() => {
  return {
    modelValue: popupDatePickerProps.value.modelValue,
    datePickerProps: popupDatePickerProps.value,
    resolveValue(selectedValues) {
      return resolveDatePickerModelValue(selectedValues, resolvedDatePickerOptions.value)
    },
  }
})

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  const popupController = createPopup<typeof DatePickerPopupContent, DatePickerResolvedValue>(
    popupBindings.value,
    DatePickerPopupContent,
    slots as FunctionalPopupSlots,
  )

  try {
    const popupPromise = popupController.open(popupContentProps)
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
    :placeholder="props.placeholder || '请选择日期'"
    @click="open"
  />
</template>
