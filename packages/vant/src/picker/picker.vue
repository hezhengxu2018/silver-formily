<script setup lang="ts">
import type { Field } from '@formily/core'
import type {
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerClickOptionEventParams,
  PickerConfirmEventParams,
  PickerOption,
  PickerOptionValue,
  PickerProps,
  PickerResolvedValue,
  PickerScrollIntoEventParams,
} from './types'
import { useField } from '@silver-formily/vue'
import { Picker as VanPicker, Popup as VanPopup } from 'vant'
import { computed, ref, watch } from 'vue'
import { PopupTriggerInput, useCleanAttrs, usePopupState } from '../__builtins__'
import {
  clonePickerValue,
  formatPickerDisplay,
  normalizePickerColumns,
  resolvePickerInnerValue,
  resolvePickerModelValue,
  resolvePickerPlaceholder,
  resolvePickerSelectedOptions,
} from './utils'

defineOptions({
  name: 'FPicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerProps>(), {
  columns: () => [],
  separator: ' / ',
  position: 'bottom',
  round: true,
  overlay: true,
  lockScroll: true,
  lazyRender: true,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: PickerResolvedValue]
  'update:show': [value: boolean]
  'change': [payload: PickerChangeEventParams]
  'confirm': [payload: PickerConfirmEventParams]
  'cancel': [payload: PickerCancelEventParams]
  'clickOption': [payload: PickerClickOptionEventParams]
  'scrollInto': [payload: PickerScrollIntoEventParams]
  'clickOverlay': [event: MouseEvent]
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const fieldRef = useField<Field>()
const { props: triggerInputProps } = useCleanAttrs(['columns', 'modelValue', 'onUpdate:modelValue'])
const innerValue = ref<PickerOptionValue[]>([])

const selectedOptions = computed(() => {
  return resolvePickerSelectedOptions(props.modelValue, props.columns, props.columnsFieldNames)
})
const displayValue = computed(() => {
  return resolvePickerModelValue(props.modelValue, props.columns, props.columnsFieldNames)
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clonePickerValue(displayValue.value),
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
const resolvedPlaceholder = computed(() => resolvePickerPlaceholder(props.placeholder))

function resetInnerValue() {
  innerValue.value = resolvePickerInnerValue(
    props.modelValue,
    props.columns,
    props.columnsFieldNames,
  )
}

function emitVisibilityChange(value: boolean) {
  emit('update:show', value)

  if (value) {
    emit('open')
    return
  }

  emit('close')
}

const { popupVisible, open, close, onPopupShowChange } = usePopupState({
  disabled: () => props.disabled || props.readonly || props.readOnly,
  onBeforeOpen: resetInnerValue,
  onRestore: resetInnerValue,
  onVisibilityChange: emitVisibilityChange,
})

watch([() => props.columns, () => props.modelValue], () => {
  if (!popupVisible.value)
    resetInnerValue()
}, { deep: true, immediate: true })

const popupProps = computed(() => {
  return {
    closeOnClickOverlay: props.closeOnClickOverlay,
    closeOnPopstate: props.closeOnPopstate,
    duration: props.duration,
    lazyRender: props.lazyRender,
    lockScroll: props.lockScroll,
    overlay: props.overlay,
    position: props.position,
    round: props.round,
    safeAreaInsetBottom: props.safeAreaInsetBottom,
    safeAreaInsetTop: props.safeAreaInsetTop,
    show: popupVisible.value,
    teleport: props.teleport,
    transition: props.transition,
    zIndex: props.zIndex,
  }
})

const pickerProps = computed(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columns: normalizePickerColumns(props.columns, props.columnsFieldNames) as any,
    confirmButtonText: props.confirmButtonText,
    loading: props.loading,
    modelValue: innerValue.value,
    optionHeight: props.optionHeight,
    readonly: props.readonly || props.readOnly || props.disabled,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    toolbarPosition: props.toolbarPosition,
    visibleOptionNum: props.visibleOptionNum,
  }
})

function createBaseEventPayload(params: {
  selectedIndexes: number[]
  selectedOptions: Array<PickerOption | undefined>
  selectedValues: PickerOptionValue[]
}) {
  return {
    field: fieldRef.value,
    selectedIndexes: [...params.selectedIndexes],
    selectedOptions: [...params.selectedOptions],
    selectedValues: [...params.selectedValues],
  }
}

function onPickerValueChange(value: PickerOptionValue[]) {
  innerValue.value = [...value]
}

function onChange(payload: Omit<PickerChangeEventParams, 'field'>) {
  emit('change', {
    ...createBaseEventPayload(payload),
    columnIndex: payload.columnIndex,
  })
}

function onCancel(payload: Omit<PickerCancelEventParams, 'field'>) {
  emit('cancel', createBaseEventPayload(payload))
  close()
}

function onConfirm(payload: Omit<PickerConfirmEventParams, 'field'>) {
  const nextValue = resolvePickerModelValue(
    payload.selectedValues,
    props.columns,
    props.columnsFieldNames,
  )

  emit('update:modelValue', clonePickerValue(nextValue))
  emit('confirm', createBaseEventPayload(payload))
  close(false)
}

function onClickOption(payload: Omit<PickerClickOptionEventParams, 'field'>) {
  emit('clickOption', {
    ...createBaseEventPayload(payload),
    columnIndex: payload.columnIndex,
    currentOption: payload.currentOption,
  })
}

function onScrollInto(payload: Omit<PickerScrollIntoEventParams, 'field'>) {
  emit('scrollInto', {
    columnIndex: payload.columnIndex,
    currentOption: payload.currentOption,
    field: fieldRef.value,
  })
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="props.disabled"
    :value="displayText"
    :placeholder="resolvedPlaceholder"
    @click="open"
  />

  <VanPopup
    v-bind="popupProps"
    @update:show="onPopupShowChange"
    @click-overlay="(event) => emit('clickOverlay', event)"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <VanPicker
      v-bind="pickerProps"
      @update:model-value="onPickerValueChange"
      @change="onChange"
      @cancel="onCancel"
      @confirm="onConfirm"
      @click-option="onClickOption"
      @scroll-into="onScrollInto"
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
  </VanPopup>
</template>
