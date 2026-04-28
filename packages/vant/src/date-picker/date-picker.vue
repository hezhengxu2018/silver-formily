<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type { DatePickerPanelProps } from '../date-picker-panel'
import type {
  DatePickerPopupProps,
  DatePickerProps,
  DatePickerResolvedValue,
  PickerOption,
} from './types'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, useCleanAttrs } from '../__builtins__'
import { createPopup } from '../create-popup'
import DatePickerPanel from '../date-picker-panel/date-picker-panel.vue'
import { usePickerInactiveState } from '../picker/use-picker-inactive-state'
import {
  formatDatePickerValue,
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
const panelProps = computed<DatePickerPanelProps>(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columnsType: props.columnsType,
    confirmButtonText: props.confirmButtonText,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    loading: props.loading,
    maxDate: props.maxDate,
    minDate: props.minDate,
    modelValue: props.modelValue,
    optionHeight: props.optionHeight,
    readonly: isPopupReadonly.value,
    separator: props.separator,
    swipeDuration: props.swipeDuration,
    title: props.title,
    valueFormat: props.valueFormat,
    visibleOptionNum: props.visibleOptionNum,
  }
})

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  const popupController = createPopup<typeof DatePickerPanel, DatePickerResolvedValue>(
    popupBindings.value,
    DatePickerPanel,
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
    :placeholder="props.placeholder || '请选择日期'"
    @click="open"
  />
</template>
