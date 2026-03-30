<script setup lang="ts">
import type { Field } from '@formily/core'
import type {
  PickerOption,
  TimePickerCancelEventParams,
  TimePickerChangeEventParams,
  TimePickerConfirmEventParams,
  TimePickerProps,
  TimePickerResolvedValue,
} from './types'
import { useField } from '@silver-formily/vue'
import { Popup as VanPopup, TimePicker as VanTimePicker } from 'vant'
import { computed, inject, ref } from 'vue'
import { PopupTriggerInput, useCleanAttrs, usePopupState } from '../__builtins__'
import { pickerGroupInlineContextKey } from '../picker-group/context'
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
  separator: ':',
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
  'update:modelValue': [value: TimePickerResolvedValue]
  'update:show': [value: boolean]
  'change': [payload: TimePickerChangeEventParams]
  'confirm': [payload: TimePickerConfirmEventParams]
  'cancel': [payload: TimePickerCancelEventParams]
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

function resetInnerValue() {
  innerValue.value = resolveTimePickerInnerValue(props.modelValue, resolvedTimePickerOptions.value)
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

const popupTimePickerProps = computed(() => {
  return {
    ...sharedTimePickerProps.value,
    modelValue: innerValue.value,
  }
})

const inlineTimePickerProps = computed(() => {
  return {
    ...sharedTimePickerProps.value,
    modelValue: resolveTimePickerInnerValue(props.modelValue, resolvedTimePickerOptions.value),
  }
})

function onInlineModelValueChange(value: string[]) {
  emit('update:modelValue', resolveTimePickerModelValue(value, resolvedTimePickerOptions.value))
}

function onPopupModelValueChange(value: string[]) {
  innerValue.value = [...value]
}

function onChange(payload: Omit<TimePickerChangeEventParams, 'field'>) {
  emit('change', {
    ...createBaseEventPayload(payload),
    columnIndex: payload.columnIndex,
  })
}

function onCancel(payload: Omit<TimePickerCancelEventParams, 'field'>) {
  emit('cancel', createBaseEventPayload(payload))
  close()
}

function onConfirm(payload: Omit<TimePickerConfirmEventParams, 'field'>) {
  const nextValue = resolveTimePickerModelValue(payload.selectedValues, resolvedTimePickerOptions.value)

  emit('update:modelValue', nextValue)
  emit('confirm', createBaseEventPayload(payload))
  close(false)
}
</script>

<template>
  <VanTimePicker
    v-if="inPickerGroup"
    v-bind="inlineTimePickerProps"
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
  </VanTimePicker>

  <template v-else>
    <PopupTriggerInput
      :input-props="triggerInputProps"
      :disabled="props.disabled"
      :value="displayText"
      :placeholder="props.placeholder || '请选择时间'"
      @click="open"
    />

    <VanPopup
      v-bind="popupProps"
      @update:show="onPopupShowChange"
      @click-overlay="(event) => emit('clickOverlay', event)"
      @opened="emit('opened')"
      @closed="emit('closed')"
    >
      <VanTimePicker
        v-bind="popupTimePickerProps"
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
      </VanTimePicker>
    </VanPopup>
  </template>
</template>
