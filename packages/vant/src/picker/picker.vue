<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type {
  PickerPopupContentProps,
  PickerPopupPickerProps,
  PickerPopupProps,
  PickerProps,
  PickerResolvedValue,
} from './types'
import { clone } from 'es-toolkit'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs } from '../__builtins__'
import { createPopup } from '../create-popup'
import PickerPopupContent from './picker-popup-content.vue'
import { usePickerInactiveState } from './use-picker-inactive-state'
import {
  formatPickerDisplay,
  normalizePickerColumns,
  resolvePickerInnerValue,
  resolvePickerModelValue,
  resolvePickerSelectedOptions,
} from './utils'

defineOptions({
  name: 'FPicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerProps>(), {
  columns: () => [],
  popupProps: () => ({}),
  separator: ' / ',
})

const emit = defineEmits<{
  'update:modelValue': [value: PickerResolvedValue]
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const { props: triggerInputProps } = useCleanAttrs()
const { isPopupReadonly, isTriggerDisabled } = usePickerInactiveState(props)

const selectedOptions = computed(() => {
  return resolvePickerSelectedOptions(props.modelValue, props.columns, props.columnsFieldNames)
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clone(props.modelValue),
      [...selectedOptions.value],
    )
  }

  return formatPickerDisplay(
    props.modelValue,
    props.columns,
    props.columnsFieldNames,
    props.separator,
  )
})

const popupBindings = computed(() => {
  return {
    ...props.popupProps,
    onOpened: () => emit('opened'),
    onClosed: () => emit('closed'),
  } satisfies PickerPopupProps & Record<string, unknown>
})
const pickerProps = computed<PickerPopupPickerProps>(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columns: normalizePickerColumns(props.columns, props.columnsFieldNames) as any,
    confirmButtonText: props.confirmButtonText,
    loading: props.loading,
    modelValue: resolvePickerInnerValue(
      props.modelValue,
      props.columns,
      props.columnsFieldNames,
    ),
    optionHeight: props.optionHeight,
    readonly: isPopupReadonly.value,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    toolbarPosition: props.toolbarPosition,
    visibleOptionNum: props.visibleOptionNum,
  }
})
const popupContentProps = computed<PickerPopupContentProps>(() => {
  return {
    pickerProps: pickerProps.value,
    resolveValue(selectedValues) {
      return resolvePickerModelValue(
        selectedValues,
        props.columns,
        props.columnsFieldNames,
      )
    },
  }
})

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  const popupController = createPopup<typeof PickerPopupContent, PickerResolvedValue>(
    popupBindings.value,
    PickerPopupContent,
    slots as FunctionalPopupSlots,
  )

  try {
    const value = await popupController.open(popupContentProps.value)
    emit('update:modelValue', value)
  }
  catch {
  }
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="isTriggerDisabled"
    :value="displayText"
    :placeholder="resolveSelectionPlaceholder(props.placeholder)"
    @click="open"
  />
</template>
