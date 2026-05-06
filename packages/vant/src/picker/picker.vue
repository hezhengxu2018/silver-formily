<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type { PickerPanelProps } from '../picker-panel'
import type {
  PickerPopupProps,
  PickerProps,
  PickerResolvedValue,
} from './types'
import { clone } from 'es-toolkit'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs, usePopupTriggerState } from '../__builtins__'
import { createPopup } from '../create-popup'
import PickerPanel from '../picker-panel/picker-panel.vue'
import {
  formatPickerDisplay,
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
const { isTriggerDisabled, isTriggerReadonly } = usePopupTriggerState({
  disabled: () => Boolean(props.disabled),
  readonly: () => Boolean(props.readonly),
})

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
  } satisfies PickerPopupProps & Record<string, unknown>
})
const panelProps = computed<PickerPanelProps>(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columns: props.columns,
    columnsFieldNames: props.columnsFieldNames,
    confirmButtonText: props.confirmButtonText,
    loading: props.loading,
    modelValue: props.modelValue,
    optionHeight: props.optionHeight,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    toolbarPosition: props.toolbarPosition,
    visibleOptionNum: props.visibleOptionNum,
  }
})

async function open() {
  if (isTriggerDisabled.value || isTriggerReadonly.value) {
    return
  }

  const popupController = createPopup<typeof PickerPanel, PickerResolvedValue>(
    popupBindings.value,
    PickerPanel,
    slots as FunctionalPopupSlots,
  )

  try {
    const popupPromise = popupController.open(panelProps)
    emit('opened')

    const value = await popupPromise

    emit('update:modelValue', value)
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
    :placeholder="resolveSelectionPlaceholder(props.placeholder)"
    @click="open"
  />
</template>
