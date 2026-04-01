<script setup lang="ts">
import type { Field } from '@formily/core'
import type {
  DatePickerCancelEventParams,
  DatePickerChangeEventParams,
  DatePickerConfirmEventParams,
  DatePickerProps,
  DatePickerResolvedValue,
  PickerOption,
} from './types'
import { useField } from '@silver-formily/vue'
import { DatePicker as VanDatePicker, Popup as VanPopup } from 'vant'
import { computed, inject, ref } from 'vue'
import { PopupTriggerInput, useCleanAttrs, usePopupState } from '../__builtins__'
import { pickerGroupInlineContextKey } from '../picker-group/context'
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
  separator: '-',
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
  'update:modelValue': [value: DatePickerResolvedValue]
  'update:show': [value: boolean]
  'change': [payload: DatePickerChangeEventParams]
  'confirm': [payload: DatePickerConfirmEventParams]
  'cancel': [payload: DatePickerCancelEventParams]
  'clickOverlay': [event: MouseEvent]
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const fieldRef = useField<Field>()
const inPickerGroup = inject(pickerGroupInlineContextKey, false)
const { props: triggerInputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])
const innerValue = ref<string[]>([])

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

function resetInnerValue() {
  innerValue.value = resolveDatePickerInnerValue(props.modelValue, resolvedDatePickerOptions.value)
}

function createBaseEventPayload(params: {
  selectedIndexes: number[]
  selectedOptions: Array<PickerOption | undefined>
  selectedValues: string[]
}) {
  return {
    field: fieldRef.value,
    selectedIndexes: [...params.selectedIndexes],
    selectedOptions: [...params.selectedOptions],
    selectedValues: [...params.selectedValues],
  }
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
    readonly: props.readonly || props.readOnly || props.disabled,
    showToolbar: true,
    swipeDuration: props.swipeDuration,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})

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

const popupDatePickerProps = computed(() => {
  return {
    ...sharedDatePickerProps.value,
    modelValue: innerValue.value,
  }
})

const inlineDatePickerProps = computed(() => {
  return {
    ...sharedDatePickerProps.value,
    modelValue: resolveDatePickerInnerValue(props.modelValue, resolvedDatePickerOptions.value),
  }
})

function onInlineModelValueChange(value: string[]) {
  emit('update:modelValue', resolveDatePickerModelValue(value, resolvedDatePickerOptions.value))
}

function onPopupModelValueChange(value: string[]) {
  innerValue.value = [...value]
}

function onChange(payload: Omit<DatePickerChangeEventParams, 'field'>) {
  emit('change', {
    ...createBaseEventPayload(payload),
    columnIndex: payload.columnIndex,
  })
}

function onCancel(payload: Omit<DatePickerCancelEventParams, 'field'>) {
  emit('cancel', createBaseEventPayload(payload))
  close()
}

function onConfirm(payload: Omit<DatePickerConfirmEventParams, 'field'>) {
  const nextValue = resolveDatePickerModelValue(payload.selectedValues, resolvedDatePickerOptions.value)

  emit('update:modelValue', nextValue)
  emit('confirm', createBaseEventPayload(payload))
  close(false)
}
</script>

<template>
  <VanDatePicker
    v-if="inPickerGroup"
    v-bind="inlineDatePickerProps"
    @update:model-value="onInlineModelValueChange"
    @change="onChange"
    @cancel="(payload) => emit('cancel', createBaseEventPayload(payload))"
    @confirm="(payload) => emit('confirm', createBaseEventPayload(payload))"
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

  <template v-else>
    <PopupTriggerInput
      :input-props="triggerInputProps"
      :disabled="props.disabled"
      :value="displayText"
      :placeholder="props.placeholder || '请选择日期'"
      @click="open"
    />

    <VanPopup
      v-bind="popupProps"
      @update:show="onPopupShowChange"
      @click-overlay="(event) => emit('clickOverlay', event)"
      @opened="emit('opened')"
      @closed="emit('closed')"
    >
      <VanDatePicker
        v-bind="popupDatePickerProps"
        @update:model-value="onPopupModelValueChange"
        @change="onChange"
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
    </VanPopup>
  </template>
</template>
